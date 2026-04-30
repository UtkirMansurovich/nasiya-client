import { type FC, useState } from "react";
import { Modal, Upload, Button, Table, Alert, Tag } from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useImportBulk } from "../hooks/useCustomers";
import type { ICreateCustomer, ExcelCustomerRow } from "../interfaces";

const { Dragger } = Upload;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelImportModal: FC<Props> = ({ isOpen, onClose }) => {
  const [previewData, setPreviewData] = useState<ICreateCustomer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    created: number;
    updated: number;
    errors: { row: number; phone: string; message: string }[];
  } | null>(null);

  const { mutateAsync: importBulk, isPending } = useImportBulk();

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
    ws["!cols"] = Array(12).fill({ wch: 20 });
    XLSX.writeFile(wb, "mijozlar_shablon.xlsx");
  };

  // Excel faylni o'qish — faqat parse, hech qanday DB tekshiruvsiz
  const handleFile = (file: File) => {
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<ExcelCustomerRow>(sheet);

        if (rows.length === 0) {
          setError("Excel fayl bo'sh!");
          return;
        }

        const customers: ICreateCustomer[] = rows
          .map((row) => ({
            full_name: String(row["To'liq ism"] || "").trim(),
            phone: String(row["Telefon"] || "").trim(),
            phone2: String(row["Qo'shimcha telefon"] || "").trim(),
            address: String(row["Manzil"] || "").trim(),
            passport_series: String(row["Pasport seriya"] || "").trim(),
            passport_number: String(row["Pasport raqam"] || "").trim(),
            passport_issued_by: String(row["Kim bergan"] || "").trim(),
            passport_issued_date: String(row["Berilgan sana"] || "").trim(),
            referred_by: String(row["Kim orqali kelgan"] || "").trim(),
            workplace: String(row["Ish joyi"] || "").trim(),
            guarantor_name: String(row["Kafil ismi"] || "").trim(),
            guarantor_phone: String(row["Kafil telefon"] || "").trim(),
          }))
          .filter((c) => c.full_name && c.phone); // bo'sh qatorlarni o'tkazib yuborish

        const phones = customers.map((c) => c.phone);
        const uniquePhones = new Set(phones);
        if (phones.length !== uniquePhones.size) {
          setError(
            "Excel faylda bir xil telefon raqamlar bor! Dublikatlarni o'chirib qayta yuklang.",
          );
          return;
        }

        setPreviewData(customers);
      } catch {
        setError("Excel faylni o'qishda xatolik! Fayl formatini tekshiring.");
      }
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  // Import — backend hallasi qiladi
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
    { title: "To'liq ism", dataIndex: "full_name", width: 160 },
    { title: "Telefon", dataIndex: "phone", width: 140 },
    {
      title: "Manzil",
      dataIndex: "address",
      width: 130,
      render: (text: string) => text || "—",
    },
    {
      title: "Pasport",
      width: 120,
      render: (_: unknown, r: ICreateCustomer) =>
        r.passport_series && r.passport_number
          ? `${r.passport_series} ${r.passport_number}`
          : "—",
    },
    {
      title: "Kafil",
      dataIndex: "guarantor_name",
      width: 140,
      render: (text: string) => text || "—",
    },
  ];

  return (
    <Modal
      title="Excel dan mijozlarni import qilish"
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
            message="Import muvaffaqiyatli yakunlandi!"
            description={
              <div className="flex flex-col gap-1 mt-1">
                <span>✅ {result.created} ta yangi mijoz qo'shildi</span>
                <span>🔄 {result.updated} ta mijoz yangilandi</span>
                {result.errors.length > 0 && (
                  <span className="text-rose-500">
                    ⚠️ {result.errors.length} ta xatolik
                  </span>
                )}
              </div>
            }
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

        {/* Preview */}
        {previewData.length > 0 && (
          <>
            <div className="flex items-center gap-3">
              <Tag color="blue" className="text-sm px-3 py-1">
                📋 Jami: {previewData.length} ta mijoz
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
                {previewData.length} ta mijoz import qilinadi
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
                    : `${previewData.length} ta mijozni import qilish`}
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
