import { type FC, useState } from "react";
import { Modal, Upload, Button, Table, Alert, Tag } from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useImportBulkCredits } from "../hooks/useCredits";

const { Dragger } = Upload;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditExcelImportModal: FC<Props> = ({ isOpen, onClose }) => {
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    created: number;
    errors: { row: number; phone: string; message: string }[];
  } | null>(null);

  const { mutateAsync: importBulk, isPending } = useImportBulkCredits();

  // Shablon yuklab olish
  const downloadTemplate = () => {
    const templateData = [
      {
        "Mijoz telefoni": "+998901234567",
        "Mahsulot": "iPhone 15 Pro",
        "Tan narxi": 12000000,
        "Ustama foiz": 30,
        "Muddat (kun)": 30,
        "Boshlanish sanasi": "2024-05-01",
        "Izoh": "Eski mijoz",
      },
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nasiyalar");
    ws["!cols"] = Array(7).fill({ wch: 20 });
    XLSX.writeFile(wb, "nasiyalar_shablon.xlsx");
  };

  const handleFile = (file: File) => {
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<any>(sheet);

        if (rows.length === 0) {
          setError("Excel fayl bo'sh!");
          return;
        }

        const credits = rows
          .map((row) => ({
            customer_phone: String(row["Mijoz telefoni"] || "").trim(),
            product_name: String(row["Mahsulot"] || "").trim(),
            cost_price: Number(row["Tan narxi"] || 0),
            markup_percent: Number(row["Ustama foiz"] || 30),
            duration_days: Number(row["Muddat (kun)"] || 30),
            start_date: row["Boshlanish sanasi"] ? new Date(row["Boshlanish sanasi"]).toISOString() : undefined,
            notes: String(row["Izoh"] || "").trim(),
          }))
          .filter((c) => c.customer_phone && c.product_name && c.cost_price > 0);

        if (credits.length === 0) {
          setError("Yaroqli ma'lumot topilmadi. Mijoz telefoni, Mahsulot va Tan narxi to'ldirilgan bo'lishi shart.");
          return;
        }

        setPreviewData(credits);
      } catch {
        setError("Excel faylni o'qishda xatolik! Fayl formatini tekshiring.");
      }
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleImport = async () => {
    try {
      const res = await importBulk(previewData);
      setResult(res);
      setPreviewData([]);
    } catch {
      setError("Import qilishda xatolik! Backendni tekshiring.");
    }
  };

  const handleClose = () => {
    setPreviewData([]);
    setError(null);
    setResult(null);
    onClose();
  };

  const previewColumns = [
    { title: "Mijoz telefoni", dataIndex: "customer_phone", width: 140 },
    { title: "Mahsulot", dataIndex: "product_name", width: 160 },
    {
      title: "Tan narxi",
      dataIndex: "cost_price",
      width: 120,
      render: (v: number) => new Intl.NumberFormat("uz-UZ").format(v) + " so'm",
    },
    { title: "Ustama (%)", dataIndex: "markup_percent", width: 100 },
    { title: "Muddat (kun)", dataIndex: "duration_days", width: 100 },
  ];

  return (
    <Modal
      title="Excel dan nasiyalarni import qilish"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={900}
      centered
    >
      <div className="flex flex-col gap-4 mt-4">
        {/* Shablon */}
        <Alert
          message="Avval shablon faylni yuklab oling, to'ldiring va qayta yuklang"
          type="info"
          showIcon
          action={
            <Button
              size="small"
              icon={<DownloadOutlined />}
              onClick={downloadTemplate}
            >
              Shablon yuklab olish
            </Button>
          }
        />

        {error && <Alert message={error} type="warning" showIcon />}

        {/* Muvaffaqiyat natijasi */}
        {result && (
          <Alert
            message="Import yakunlandi"
            description={
              <div className="flex flex-col gap-1 mt-1">
                <span>✅ {result.created} ta yangi nasiya qo'shildi</span>
                {result.errors.length > 0 && (
                  <span className="text-rose-500">
                    ⚠️ {result.errors.length} ta xatolik
                  </span>
                )}
              </div>
            }
            type={result.errors.length > 0 ? "warning" : "success"}
            showIcon
          />
        )}

        {/* Xatolar ro'yxati */}
        {result && result.errors.length > 0 && (
          <Table
            dataSource={result.errors}
            columns={[
              { title: "Qator", dataIndex: "row", width: 80 },
              { title: "Telefon", dataIndex: "phone", width: 140 },
              { title: "Xatolik", dataIndex: "message" },
            ]}
            rowKey={(_, i) => String(i)}
            pagination={false}
            size="small"
            scroll={{ y: 200 }}
            className="mt-2"
          />
        )}

        {/* Fayl yuklash */}
        {previewData.length === 0 && !result && (
          <Dragger
            accept=".xlsx,.xls"
            beforeUpload={handleFile}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Excel faylni shu yerga tashlang yoki bosing
            </p>
            <p className="ant-upload-hint">.xlsx yoki .xls formatida</p>
          </Dragger>
        )}

        {/* Preview */}
        {previewData.length > 0 && (
          <>
            <div className="flex items-center gap-3">
              <Tag color="blue" className="text-sm px-3 py-1">
                📋 Jami: {previewData.length} ta nasiya
              </Tag>
            </div>
            <Table
              dataSource={previewData}
              columns={previewColumns}
              rowKey={(_, i) => String(i)}
              pagination={false}
              scroll={{ x: 700, y: 300 }}
              size="small"
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {previewData.length} ta nasiya import qilinadi
              </span>
              <div className="flex gap-3">
                <Button onClick={() => setPreviewData([])}>Bekor qilish</Button>
                <Button
                  type="primary"
                  onClick={handleImport}
                  loading={isPending}
                >
                  {isPending
                    ? "Import qilinmoqda..."
                    : `${previewData.length} ta nasiyani import qilish`}
                </Button>
              </div>
            </div>
          </>
        )}

        {result && (
          <div className="flex justify-end mt-4">
            <Button type="primary" onClick={handleClose}>
              Yopish
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
