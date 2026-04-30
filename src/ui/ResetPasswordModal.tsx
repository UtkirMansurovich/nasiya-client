import { type FC, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useUpdatePartnerAccount } from "../hooks/usePartners";
import type { ICreatePartner } from "../interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  partnerId: number | null;
  initialUsername?: string;
}

export const ResetPasswordModal: FC<Props> = ({
  isOpen,
  onClose,
  partnerId,
  initialUsername,
}) => {
  const [form] = Form.useForm();
  const { mutate: updateAccount, isPending } = useUpdatePartnerAccount();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({ username: initialUsername });
    }
  }, [isOpen, initialUsername, form]);

  const handleSubmit = (values: Partial<ICreatePartner>) => {
    if (!partnerId) return;

    updateAccount(
      { id: partnerId, data: values },
      {
        onSuccess: () => {
          message.success("Hisob ma'lumotlari muvaffaqiyatli yangilandi");
          form.resetFields();
          onClose();
        },
        onError: (error: Error) => {
          message.error(error?.message || "Xatolik yuz berdi");
        },
      },
    );
  };

  return (
    <Modal
      title="Kirish ma'lumotlarini tahrirlash"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose // Modal yopilganda ichidagi datalarni tozalash uchun
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username kiriting!" }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Yangi Parol (ixtiyoriy)"
          name="password"
          extra="Agar parolni o'zgartirmoqchi bo'lsangiz kiriting, aks holda bo'sh qoldiring."
          rules={[
            { min: 6, message: "Parol kamida 6 belgidan iborat bo'lsin!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            size="large"
          />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="large" onClick={onClose}>
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
