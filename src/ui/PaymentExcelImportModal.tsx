import { type FC, useState } from "react";
import { Modal, Upload, Button, Table, Alert, Tag } from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useImportBulkPayments } from "../hooks/usePayments";

const { Dragger } = Upload;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Excel row type
interface PaymentExcelRow {
  Telefon?: string;
  Mahsulot?: string;
  [date: string]: string | number | undefined;
}

export const PaymentExcelImportModal: FC<Props> = ({ isOpen, onClose }) => {
  const [previewData, setPreviewData] = useState<Record<string, unknown>[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    created: number;
    errors: { row: number; phone: string; date: string; message: string }[];
  } | null>(null);

  const { mutateAsync: importBulk, isPending } = useImportBulkPayments();

  // Haftalik shablon — seshanbadan yakshanbagacha
  const downloadTemplate = () => {
    // Hozirgi haftaning seshanbasi
    const today = new Date();
    const day = today.getDay(); // 0=yakshanba, 1=dushanba...
    // Seshanbaga o'tish (2)
    // const diff = day <= 2 ? 2 - day : 9 - day;
    const tuesday = new Date(today);
    tuesday.setDate(
      today.getDate() - (day === 2 ? 0 : day < 2 ? day + 5 : day - 2),
    );

    const weekDates = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(tuesday);
      d.setDate(tuesday.getDate() + i);
      return d
        .toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\./g, ".");
    });

    const templateData = [
      {
        Telefon: "+998901234567",
        Mahsulot: "iPhone 15",
        [weekDates[0]]: 15000,
        [weekDates[1]]: 15000,
        [weekDates[2]]: 0,
        [weekDates[3]]: 15000,
        [weekDates[4]]: 15000,
        [weekDates[5]]: 15000,
      },
      {
        Telefon: "+998911234567",
        Mahsulot: "Samsung A55",
        [weekDates[0]]: 10000,
        [weekDates[1]]: 10000,
        [weekDates[2]]: 10000,
        [weekDates[3]]: 0,
        [weekDates[4]]: 10000,
        [weekDates[5]]: 10000,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "To'lovlar");
    ws["!cols"] = [{ wch: 16 }, { wch: 16 }, ...Array(6).fill({ wch: 12 })];
    XLSX.writeFile(wb, "tolovlar_shablon.xlsx");
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
        const rows = XLSX.utils.sheet_to_json<PaymentExcelRow>(sheet);

        if (rows.length === 0) {
          setError("Excel fayl bo'sh!");
          return;
        }

        // Ustun nomlaridan sanalarni ajratib olish
        const allKeys = Object.keys(rows[0]);
        const fixedKeys = ["Telefon", "Mahsulot"];
        const dateColumns = allKeys.filter((k) => !fixedKeys.includes(k));

        if (dateColumns.length === 0) {
          setError("Sana ustunlari topilmadi! Shablon formatini tekshiring.");
          return;
        }

        if (dateColumns.length !== 6) {
          setError(
            `6 ta sana ustuni bo'lishi kerak, ${dateColumns.length} ta topildi!`,
          );
          return;
        }

        const payments = rows
          .filter((row) => row["Telefon"])
          .map((row) => {
            const payment: Record<string, unknown> = {
              customer_phone: String(row["Telefon"] || "").trim(),
              product_name: String(row["Mahsulot"] || "").trim(),
            };
            dateColumns.forEach((date) => {
              payment[date] = Number(row[date] || 0);
            });
            return payment;
          });

        if (payments.length === 0) {
          setError("Yaroqli ma'lumot topilmadi!");
          return;
        }

        setDates(dateColumns);
        setPreviewData(payments);
      } catch {
        setError("Excel faylni o'qishda xatolik! Fayl formatini tekshiring.");
      }
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleImport = async () => {
    try {
      const res = await importBulk({ payments: previewData, dates });
      setResult(res);
      setPreviewData([]);
    } catch {
      setError("Import qilishda xatolik! Backendni tekshiring.");
    }
  };

  const handleClose = () => {
    setPreviewData([]);
    setDates([]);
    setError(null);
    setResult(null);
    onClose();
  };

  // Preview jadval ustunlari
  const previewColumns = [
    { title: "Telefon", dataIndex: "customer_phone", width: 140 },
    { title: "Mahsulot", dataIndex: "product_name", width: 140 },
    ...dates.map((date) => ({
      title: date,
      dataIndex: date,
      width: 100,
      render: (v: number) =>
        v > 0 ? (
          <span className="text-emerald-600 font-semibold">
            {new Intl.NumberFormat("uz-UZ").format(v)}
          </span>
        ) : (
          <span className="text-gray-300">0</span>
        ),
    })),
  ];

  return (
    <Modal
      title="Excel dan haftalik to'lovlarni import qilish"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={1000}
      centered
    >
      <div className="flex flex-col gap-4 mt-4">
        <Alert
          message="Shablon: Telefon, Mahsulot, va 6 ta kunlik sana ustunlari (seshanbadan yakshanbagacha)"
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

        {result && (
          <Alert
            message="Import yakunlandi"
            description={
              <div className="flex flex-col gap-1 mt-1">
                <span>✅ {result.created} ta to'lov qo'shildi</span>
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

        {/* Xatolar jadvali */}
        {result && result.errors.length > 0 && (
          <Table
            dataSource={result.errors}
            columns={[
              { title: "Qator", dataIndex: "row", width: 70 },
              { title: "Telefon", dataIndex: "phone", width: 140 },
              { title: "Sana", dataIndex: "date", width: 100 },
              { title: "Xatolik", dataIndex: "message" },
            ]}
            rowKey={(_, i) => String(i)}
            pagination={false}
            size="small"
            scroll={{ y: 200 }}
          />
        )}

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

        {previewData.length > 0 && (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <Tag color="blue" className="text-sm px-3 py-1">
                📋 {previewData.length} ta mijoz
              </Tag>
              <Tag color="purple" className="text-sm px-3 py-1">
                📅 {dates.join(" · ")}
              </Tag>
            </div>
            <Table
              dataSource={previewData}
              columns={previewColumns}
              rowKey={(_, i) => String(i)}
              pagination={false}
              scroll={{ x: 800, y: 300 }}
              size="small"
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {previewData.length} ta mijoz, {dates.length} kunlik to'lovlar
                import qilinadi
              </span>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setPreviewData([]);
                    setDates([]);
                  }}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  onClick={handleImport}
                  loading={isPending}
                >
                  {isPending ? "Import qilinmoqda..." : "Import qilish"}
                </Button>
              </div>
            </div>
          </>
        )}

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
