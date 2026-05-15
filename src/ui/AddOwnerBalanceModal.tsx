import { type FC } from "react";
import { Modal, Form, InputNumber, Input, Button, message } from "antd";
import { useAddOwnerBalance } from "../hooks/useOwner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddOwnerBalanceModal: FC<Props> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { mutate: addBalance, isPending } = useAddOwnerBalance();

  const handleSubmit = (values: { amount: number; notes?: string }) => {
    addBalance(values, {
      onSuccess: () => {
        message.success("Mablag' muvaffaqiyatli qo'shildi!");
        form.resetFields();
        onClose();
      },
      onError: (error: Error) => {
        message.error(error.message || "Xatolik yuz berdi!");
      },
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Mablag' qo'shish"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
      centered
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          label="Summa (UZS)"
          name="amount"
          rules={[{ required: true, message: "Summani kiriting!" }]}
        >
          <InputNumber<number>
            placeholder="10 000 000"
            size="large"
            style={{ width: "100%" }}
            min={0}
            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            parser={(v) => v?.replace(/\s/g, "") as unknown as number}
          />
        </Form.Item>

        <Form.Item label="Izoh" name="notes">
          <Input.TextArea
            placeholder="Mablag' manbasi yoki izoh..."
            rows={3}
            size="large"
          />
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
            Qo'shish
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
