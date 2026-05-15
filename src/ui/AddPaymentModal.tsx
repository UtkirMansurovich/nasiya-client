import { useState, useMemo, useEffect, type FC } from "react";
import { Modal, Select, InputNumber, Button, Input, Form, message } from "antd";
import {
  CreditCardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useCredits } from "../hooks/useCredits";
import { useCreatePayment } from "../hooks/usePayments";
import type { ICreatePayment, ICredit } from "../interfaces";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCustomerId?: number;
  defaultCreditId?: number; // ← yangi prop
}

export const AddPaymentModal: FC<AddPaymentModalProps> = ({
  isOpen,
  onClose,
  defaultCustomerId,
  defaultCreditId, // ← yangi prop
}) => {
  const [form] = Form.useForm();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    defaultCustomerId ?? null,
  );

  const { data: credits = [], isLoading: isCreditsLoading } = useCredits();
  const { mutate: createPayment, isPending } = useCreatePayment();

  const activeCredits = useMemo(
    () => credits.filter((c: ICredit) => c.status === "active"),
    [credits],
  );

  const customersWithActiveCredits = useMemo(() => {
    const map = new Map();
    activeCredits.forEach((c: ICredit) => {
      if (!map.has(c.customer?.id)) {
        map.set(c.customer?.id, c.customer);
      }
    });
    return Array.from(map.values());
  }, [activeCredits]);

  const customerCredits = useMemo(() => {
    if (!selectedCustomerId) return [];
    return activeCredits.filter(
      (c: ICredit) => c.customer?.id === selectedCustomerId,
    );
  }, [activeCredits, selectedCustomerId]);

  // ← defaultCreditId kelganda avtomatik to'ldirish
  useEffect(() => {
    if (isOpen && defaultCreditId && credits.length > 0) {
      const credit = credits.find((c: ICredit) => c.id === defaultCreditId);
      if (credit) {
        setSelectedCustomerId(credit.customer?.id ?? null);
        form.setFieldsValue({
          customerId: credit.customer?.id,
          creditId: credit.id,
          amount: credit.daily_payment, // ← kunlik to'lov default
        });
      }
    }
  }, [isOpen, defaultCreditId, credits]);

  const handleClose = () => {
    form.resetFields();
    setSelectedCustomerId(defaultCustomerId ?? null);
    onClose();
  };

  const handleFinish = (values: any) => {
    const data: ICreatePayment = {
      creditId: values.creditId,
      amount: values.amount,
      method: values.method || "cash",
      notes: values.notes,
    };

    createPayment(data, {
      onSuccess: () => {
        message.success("To'lov muvaffaqiyatli saqlandi!");
        handleClose();
      },
      onError: (err: any) => {
        message.error(err?.response?.data?.message || "Xatolik yuz berdi");
      },
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
            <WalletOutlined className="text-lg" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg m-0">
            To'lov qabul qilish
          </h3>
        </div>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-6"
        initialValues={{ method: "cash" }}
      >
        <Form.Item
          label={
            <span className="font-bold flex items-center gap-2">
              <UserOutlined className="text-gray-400" /> Mijozni tanlang
            </span>
          }
          name="customerId"
          rules={[{ required: true, message: "Mijozni tanlang" }]}
        >
          <Select
            showSearch
            placeholder="Mijoz ismi yoki telefoni..."
            loading={isCreditsLoading}
            onChange={(val) => {
              setSelectedCustomerId(val);
              form.setFieldValue("creditId", undefined);
            }}
            optionFilterProp="children"
            size="large"
            className="w-full"
          >
            {customersWithActiveCredits.map((customer) => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.full_name} ({customer.phone})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="font-bold flex items-center gap-2">
              <ShoppingCartOutlined className="text-gray-400" /> Faol nasiyani
              tanlang
            </span>
          }
          name="creditId"
          rules={[{ required: true, message: "Nasiyani tanlang" }]}
        >
          <Select
            placeholder={
              selectedCustomerId
                ? "Nasiyani tanlang..."
                : "Avval mijozni tanlang"
            }
            disabled={!selectedCustomerId}
            size="large"
            className="w-full"
          >
            {customerCredits.map((c: ICredit) => (
              <Select.Option key={c.id} value={c.id}>
                {c.product_name} — Qoldiq:{" "}
                {new Intl.NumberFormat("uz-UZ").format(c.remaining_debt)} so'm
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="font-bold">To'lov miqdori (UZS)</span>}
            name="amount"
            rules={[{ required: true, message: "Miqdorni kiriting" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }
              parser={(value) => value!.replace(/\s?|(,*)/g, "")}
              placeholder="Masalan: 50 000"
              min={100}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-bold flex items-center gap-2">
                <CreditCardOutlined className="text-gray-400" /> To'lov usuli
              </span>
            }
            name="method"
            rules={[{ required: true, message: "To'lov usulini tanlang" }]}
          >
            <Select size="large" className="w-full">
              <Select.Option value="cash">Naqd</Select.Option>
              <Select.Option value="card">Karta</Select.Option>
              <Select.Option value="transfer">O'tkazma</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="font-bold flex items-center gap-2">
              <FileTextOutlined className="text-gray-400" /> Izoh (ixtiyoriy)
            </span>
          }
          name="notes"
        >
          <Input.TextArea
            placeholder="To'lov haqida qo'shimcha ma'lumot..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            size="large"
          />
        </Form.Item>

        <Form.Item className="mb-0 text-right mt-6">
          <Button onClick={handleClose} className="mr-3" size="large">
            Bekor qilish
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            size="large"
            className="bg-emerald-500 hover:bg-emerald-600 border-none"
          >
            To'lovni saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
