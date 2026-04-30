import { type FC } from "react";
import { Modal, Form, InputNumber, Input, Button } from "antd";
import { useCreateInvestment } from "../hooks/useInvestments";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  partnerId: number;
}

export const AddInvestmentModal: FC<Props> = ({
  isOpen,
  onClose,
  partnerId,
}) => {
  const [form] = Form.useForm();
  const { mutate: createInvestment, isPending } = useCreateInvestment();

  const handleSubmit = (values: { amount: number; notes?: string }) => {
    createInvestment(
      { partnerId, ...values },
      {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      title="Mablag' qo'shish"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
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
            placeholder="5 000 000"
            size="large"
            style={{ width: "100%" }}
            className="w-full"
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            parser={(value) => value?.replace(/\s/g, "") as unknown as number}
          />
        </Form.Item>

        <Form.Item label="Izoh" name="notes">
          <Input.TextArea
            placeholder="Qo'shimcha ma'lumot..."
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
            Qo'shish
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
