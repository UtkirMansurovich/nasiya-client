import { type FC, useState } from "react";
import { Modal, Upload, Button, Table, Alert, Tag } from "antd";
import {
  InboxOutlined,
  DownloadOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useUpsertCustomer, useCustomers } from "../hooks/useCustomers";
import type { ICreateCustomer, ICustomer } from "../interfaces";

const { Dragger } = Upload;

interface PreviewRow extends ICreateCustomer {
  _status: "new" | "update" | "duplicate";
  _message: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelImportModal: FC<Props> = ({ isOpen, onClose }) => {
  const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    created: number;
    updated: number;
  } | null>(null);

  const { mutateAsync: upsertCustomer } = useUpsertCustomer();
  const { data: existingCustomers } = useCustomers(); // ← database dagi mijozlar

  // Shablon yuklab olish
  const downloadTemplate = () => {
    const templateData = [
      {
        "To'liq ism": "Akbar Karimov",
        Telefon: "+998901234567",
        "Qo'shimcha telefon": "+998911234567",
        Manzil: "Toshkent, Chilonzor",
        "Pasport seriya": "AA",
        "Pasport raqam": "1234567",
        "Kim bergan": "IIB",
        "Berilgan sana": "2020-01-01",
        "Kim orqali kelgan": "Do'st orqali",
        "Ish joyi": "Kompaniya nomi",
        "Kafil ismi": "Vali Karimov",
        "Kafil telefon": "+998901234567",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mijozlar");
    ws["!cols"] = [
      { wch: 20 },
      { wch: 16 },
      { wch: 18 },
      { wch: 20 },
      { wch: 14 },
      { wch: 14 },
      { wch: 16 },
      { wch: 14 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 16 },
    ];
    XLSX.writeFile(wb, "mijozlar_shablon.xlsx");
  };

  // Excel faylni o'qish va tekshirish
  const handleFile = (file: File) => {
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (rows.length === 0) {
          setError("Excel fayl bo'sh!");
          return;
        }

        // Excel dagi telefon raqamlarni yig'ish (dublikat aniqlash uchun)
        const excelPhones: string[] = [];

        const customers: PreviewRow[] = rows
          .map((row) => ({
            full_name: String(row["To'liq ism"] || ""),
            phone: String(row["Telefon"] || ""),
            phone2: String(row["Qo'shimcha telefon"] || ""),
            address: String(row["Manzil"] || ""),
            passport_series: String(row["Pasport seriya"] || ""),
            passport_number: String(row["Pasport raqam"] || ""),
            passport_issued_by: String(row["Kim bergan"] || ""),
            passport_issued_date: String(row["Berilgan sana"] || ""),
            referred_by: String(row["Kim orqali kelgan"] || ""),
            workplace: String(row["Ish joyi"] || ""),
            guarantor_name: String(row["Kafil ismi"] || ""),
            guarantor_phone: String(row["Kafil telefon"] || ""),
            _status: "new" as const,
            _message: "",
          }))
          .filter((c) => c.full_name && c.phone)
          .map((customer) => {
            // 1. Excel faylning o'zida dublikat bormi?
            if (excelPhones.includes(customer.phone)) {
              return {
                ...customer,
                _status: "duplicate" as const,
                _message: "Excel faylda bu telefon ikki marta bor!",
              };
            }

            excelPhones.push(customer.phone);

            // 2. Database da bormi?
            const existsInDb = existingCustomers?.find(
              (c: ICustomer) => c.phone === customer.phone,
            );

            if (existsInDb) {
              return {
                ...customer,
                _status: "update" as const,
                _message: `${existsInDb.full_name} yangilanadi`,
              };
            }

            return {
              ...customer,
              _status: "new" as const,
              _message: "Yangi mijoz qo'shiladi",
            };
          });

        setPreviewData(customers);
      } catch {
        setError("Excel faylni o'qishda xatolik!");
      }
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  // Import qilish — dublikatlar o'tkazib yuboriladi
  const handleImport = async () => {
    const validRows = previewData.filter((c) => c._status !== "duplicate");

    setIsImporting(true);
    let created = 0;
    let updated = 0;

    try {
      for (const customer of validRows) {
        const { _status, _message, ...data } = customer;
        const res = await upsertCustomer(data);
        if (res.action === "created") created++;
        if (res.action === "updated") updated++;
      }

      setResult({ created, updated });
      setPreviewData([]);
    } catch {
      setError("Import qilishda xatolik!");
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setPreviewData([]);
    setError(null);
    setResult(null);
    onClose();
  };

  // Statistika
  const newCount = previewData.filter((c) => c._status === "new").length;
  const updateCount = previewData.filter((c) => c._status === "update").length;
  const duplicateCount = previewData.filter(
    (c) => c._status === "duplicate",
  ).length;

  const previewColumns = [
    {
      title: "To'liq ism",
      dataIndex: "full_name",
      width: 160,
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      width: 140,
    },
    {
      title: "Manzil",
      dataIndex: "address",
      width: 130,
      render: (text: string) => text || "—",
    },
    {
      title: "Holat",
      dataIndex: "_status",
      width: 180,
      render: (_: any, record: PreviewRow) => {
        if (record._status === "new")
          return <Tag color="green">✅ Yangi qo'shiladi</Tag>;
        if (record._status === "update")
          return <Tag color="blue">🔄 Yangilanadi</Tag>;
        if (record._status === "duplicate")
          return <Tag color="red">⚠️ Dublikat</Tag>;
      },
    },
    {
      title: "Izoh",
      dataIndex: "_message",
      width: 200,
      render: (text: string, record: PreviewRow) => (
        <span
          className={
            record._status === "duplicate"
              ? "text-rose-500 text-xs"
              : record._status === "update"
                ? "text-blue-500 text-xs"
                : "text-emerald-500 text-xs"
          }
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <Modal
      title="Excel dan import qilish"
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

        {/* Xatolik */}
        {error && <Alert message={error} type="warning" showIcon />}

        {/* Muvaffaqiyat */}
        {result && (
          <Alert
            message="Import muvaffaqiyatli yakunlandi!"
            description={`✅ ${result.created} ta yangi mijoz qo'shildi · 🔄 ${result.updated} ta mijoz yangilandi`}
            type="success"
            showIcon
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

        {/* Dublikat ogohlantirish */}
        {duplicateCount > 0 && (
          <Alert
            icon={<WarningOutlined />}
            message={`${duplicateCount} ta dublikat aniqlandi!`}
            description="Quyidagi telefon raqamlar Excel faylda ikki marta uchraydi. Ular import qilinmaydi. Iltimos, Excel faylni tekshirib, dublikatlarni o'chirib qayta yuklang."
            type="error"
            showIcon
          />
        )}

        {/* Statistika */}
        {previewData.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            <Tag color="green" className="text-sm px-3 py-1">
              ✅ Yangi: {newCount} ta
            </Tag>
            <Tag color="blue" className="text-sm px-3 py-1">
              🔄 Yangilanadi: {updateCount} ta
            </Tag>
            {duplicateCount > 0 && (
              <Tag color="red" className="text-sm px-3 py-1">
                ⚠️ Dublikat: {duplicateCount} ta
              </Tag>
            )}
          </div>
        )}

        {/* Preview table */}
        {previewData.length > 0 && (
          <>
            <Table
              dataSource={previewData}
              columns={previewColumns}
              rowKey={(_, i) => String(i)}
              pagination={false}
              scroll={{ x: 700, y: 300 }}
              size="small"
              rowClassName={(record: PreviewRow) =>
                record._status === "duplicate"
                  ? "bg-rose-50"
                  : record._status === "update"
                    ? "bg-blue-50"
                    : ""
              }
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {duplicateCount > 0
                  ? `⚠️ ${duplicateCount} ta dublikat o'tkazib yuboriladi`
                  : `${newCount + updateCount} ta mijoz import qilinadi`}
              </span>
              <div className="flex gap-3">
                <Button onClick={() => setPreviewData([])}>Bekor qilish</Button>
                <Button
                  type="primary"
                  onClick={handleImport}
                  loading={isImporting}
                  disabled={newCount + updateCount === 0}
                >
                  {isImporting
                    ? "Import qilinmoqda..."
                    : `${newCount + updateCount} ta mijozni import qilish`}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Natijadan keyin yopish */}
        {result && (
          <div className="flex justify-end">
            <Button type="primary" onClick={handleClose}>
              Yopish
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
