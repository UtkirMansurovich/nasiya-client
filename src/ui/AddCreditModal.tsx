import { type FC, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { useCreateCredit } from "../hooks/useCredits";
import { useCustomers } from "../hooks/useCustomers";
import { usePartners } from "../hooks/usePartners";
import type { ICreateCredit } from "../interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CreditFormValues {
  customerId: number;
  partnerId?: number;
  product_name: string;
  cost_price: number;
  markup_percent: number;
  duration_days: number;
  start_date: dayjs.Dayjs;
  notes?: string;
}

export const AddCreditModal: FC<Props> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [totalDebt, setTotalDebt] = useState(0);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [workingDays, setWorkingDays] = useState(0);

  const { mutate: createCredit, isPending } = useCreateCredit();
  const { data: customersData = [] } = useCustomers();
  const { data: partners = [] } = usePartners();
  const customers = customersData?.data || [];

  // Avtomatik hisoblash
  const calculateValues = () => {
    const costPrice = form.getFieldValue("cost_price") || 0;
    const markupPercent = form.getFieldValue("markup_percent") || 30;
    const durationDays = form.getFieldValue("duration_days") || 0;
    const startDate = form.getFieldValue("start_date");

    // Jami qarz
    const total = costPrice * (1 + markupPercent / 100);
    setTotalDebt(total);

    // Ishchi kunlar (dushanbsiz)
    if (startDate && durationDays) {
      let working = 0;
      const current = new Date(startDate.toDate());
      for (let i = 0; i < durationDays; i++) {
        if (current.getDay() !== 1) working++;
        current.setDate(current.getDate() + 1);
      }
      setWorkingDays(working);
      setDailyPayment(working > 0 ? Math.ceil(total / working) : 0);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setTotalDebt(0);
    setDailyPayment(0);
    setWorkingDays(0);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      // setState lar useEffect dan tashqarida, onCancel da qilamiz
      return;
    }
    form.setFieldsValue({
      markup_percent: 30,
      start_date: dayjs(),
    });
  }, [isOpen, form]); // ← form qo'shildi

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("uz-UZ").format(Math.round(amount)) + " UZS";

  const handleSubmit = (values: CreditFormValues) => {
    const payload: ICreateCredit = {
      customerId: values.customerId,
      partnerId: values.partnerId,
      product_name: values.product_name,
      cost_price: values.cost_price,
      markup_percent: values.markup_percent,
      duration_days: values.duration_days,
      start_date: values.start_date.format("YYYY-MM-DD"),
      notes: values.notes,
    };

    createCredit(payload, {
      onSuccess: () => {
        message.success("Nasiya muvaffaqiyatli qo'shildi!");
        form.resetFields();
        onClose();
      },
      onError: (error: Error) => {
        message.error(error.message || "Xatolik yuz berdi!");
      },
    });
  };

  return (
    <Modal
      title="Yangi nasiya qo'shish"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={calculateValues}
        className="mt-4"
      >
        {/* Mijoz va Sherik */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Mijoz va Sherik
        </p>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            label="Mijoz"
            name="customerId"
            rules={[{ required: true, message: "Mijozni tanlang!" }]}
          >
            <Select
              size="large"
              placeholder="Mijoz tanlang"
              showSearch={{
                searchValue: undefined,
                onSearch: () => {},
              }}
              options={customers.map((c) => ({
                value: c.id,
                label: c.full_name,
              }))}
            />
          </Form.Item>

          <Form.Item label="Sherik" name="partnerId">
            <Select
              size="large"
              placeholder="Sherik tanlang (ixtiyoriy)"
              allowClear
              showSearch={{
                searchValue: undefined,
                onSearch: () => {},
              }}
              options={partners.map((p) => ({
                value: p.id,
                label: `${p.full_name} — ${formatMoney(p.balance)}`,
              }))}
            />
          </Form.Item>
        </div>

        {/* Mahsulot */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">
          Mahsulot ma'lumotlari
        </p>

        <Form.Item
          label="Mahsulot nomi"
          name="product_name"
          rules={[{ required: true, message: "Mahsulot nomini kiriting!" }]}
        >
          <Input size="large" placeholder="Samsung Galaxy A55" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            label="Tannarx (UZS)"
            name="cost_price"
            rules={[{ required: true, message: "Tannarxni kiriting!" }]}
          >
            <InputNumber<number>
              size="large"
              style={{ width: "100%" }}
              min={0}
              placeholder="5 000 000"
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              parser={(v) => (v ? Number(v.replace(/\s/g, "")) : 0) as 0}
            />
          </Form.Item>

          <Form.Item
            label="Ustama foiz (%)"
            name="markup_percent"
            rules={[{ required: true, message: "Ustama foizni kiriting!" }]}
          >
            <InputNumber
              size="large"
              style={{ width: "100%" }}
              min={0}
              max={100}
              placeholder="30"
            />
          </Form.Item>
        </div>

        {/* Muddat */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">
          Muddat
        </p>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            label="Boshlanish sanasi"
            name="start_date"
            rules={[{ required: true, message: "Sanani kiriting!" }]}
          >
            <DatePicker size="large" className="w-full" format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            label="Muddat (kun)"
            name="duration_days"
            rules={[{ required: true, message: "Muddatni kiriting!" }]}
          >
            <InputNumber
              size="large"
              style={{ width: "100%" }}
              min={1}
              placeholder="90"
            />
          </Form.Item>
        </div>

        {/* Avtomatik hisoblangan qiymatlar */}
        {totalDebt > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 mb-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Jami qarz</p>
              <p className="font-bold text-gray-800">
                {formatMoney(totalDebt)}
              </p>
            </div>
            <div className="text-center border-x border-blue-100">
              <p className="text-xs text-gray-500 mb-1">Ishchi kunlar</p>
              <p className="font-bold text-gray-800">{workingDays} kun</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Kunlik to'lov</p>
              <p className="font-bold text-emerald-600">
                {formatMoney(dailyPayment)}
              </p>
            </div>
          </div>
        )}

        {/* Izoh */}
        <Form.Item label="Izoh" name="notes">
          <Input.TextArea rows={2} size="large" placeholder="Izoh..." />
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button size="large" onClick={handleClose}>
            Bekor qilish
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            Saqlash
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
