import { type FC, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { useCreatePartner, useUpdatePartner } from "../hooks/usePartners";
import type { ICreatePartner, IPartner } from "../interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editData?: IPartner | null;
}

export const AddPartnerModal: FC<Props> = ({ isOpen, onClose, editData }) => {
  const [form] = Form.useForm();
  const { mutate: createPartner, isPending: isCreating } = useCreatePartner();
  const { mutate: updatePartner, isPending: isUpdating } = useUpdatePartner();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        full_name: editData.full_name,
        phone: editData.phone,
        balance: editData.balance,
        notes: editData.notes,
        // Edit mode-da username/password endi kerak emas,
        // chunki ular alohida boshqariladi
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleSubmit = (values: ICreatePartner) => {
    const payload = {
      ...values,
      balance: Number(values.balance) || 0,
    };

    if (editData) {
      updatePartner(
        { id: editData.id, data: payload },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      // Yangi yaratishda username va password kiritish kerak bo'ladi
      // Shuning uchun Create mode-da formani biroz boshqacha qilamiz (pastga qarang)
      createPartner(payload, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      title={
        editData ? "Sherik ma'lumotlarini tahrirlash" : "Yangi sherik qo'shish"
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Shaxsiy ma'lumotlar
        </p>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            label="To'liq ism"
            name="full_name"
            rules={[{ required: true, message: "Ismni kiriting!" }]}
          >
            <Input placeholder="Familiya Ism" size="large" />
          </Form.Item>

          <Form.Item
            label="Telefon"
            name="phone"
            rules={[{ required: true, message: "Telefon kiriting!" }]}
          >
            <Input placeholder="+998 90 123 45 67" size="large" />
          </Form.Item>

          <Form.Item
            label="Kiritgan mablag' (UZS)"
            name="balance"
            rules={[{ required: true, message: "Mablag'ni kiriting!" }]}
            className="col-span-2"
          >
            <InputNumber
              placeholder="10 000 000"
              size="large"
              style={{ width: "100%" }}
              className="w-full"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }
              parser={(value) => (value ? Number(value.replace(/\s/g, "")) : 0)}
            />
          </Form.Item>
        </div>

        {/* FAQAT YANGI QO'SHISHDA LOGIN MA'LUMOTLARINI KO'RSATAMIZ */}
        {!editData && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">
              Tizimga kirish uchun (Login)
            </p>
            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username kiriting!" }]}
              >
                <Input placeholder="username" size="large" />
              </Form.Item>
              <Form.Item
                label="Parol"
                name="password"
                rules={[
                  { required: true, message: "Parol kiriting!" },
                  { min: 6 },
                ]}
              >
                <Input.Password placeholder="••••••" size="large" />
              </Form.Item>
            </div>
          </>
        )}

        <Form.Item label="Izoh" name="notes">
          <Input.TextArea
            placeholder="Qo'shimcha izohlar..."
            rows={3}
            size="large"
          />
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button size="large" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {editData ? "Saqlash" : "Qo'shish"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
