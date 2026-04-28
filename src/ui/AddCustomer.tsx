import { type FC, useState } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import { useCreateCustomer } from "../hooks/useCustomers";
import type { ICreateCustomer } from "../interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCustomerModal: FC<Props> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { mutate: createCustomer, isPending } = useCreateCustomer();

  console.log(isOpen);

  const handleSubmit = (values: ICreateCustomer) => {
    createCustomer(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  return (
    <Modal
      title="Yangi mijoz qo'shish"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        {/* Asosiy ma'lumotlar */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Asosiy ma'lumotlar
        </p>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="To'liq ism"
              name="full_name"
              rules={[{ required: true, message: "Ismni kiriting!" }]}
            >
              <Input placeholder="Familiya Ism" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Telefon"
              name="phone"
              rules={[{ required: true, message: "Telefon kiriting!" }]}
            >
              <Input placeholder="+998 90 123 45 67" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Qo'shimcha telefon" name="phone2">
              <Input placeholder="+998 91 123 45 67" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Manzil" name="address">
              <Input placeholder="Shahar, tuman" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* Pasport */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">
          Pasport ma'lumotlari
        </p>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Seriya" name="passport_series">
              <Input placeholder="AA" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Raqam" name="passport_number">
              <Input placeholder="1234567" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Kim tomonidan berilgan" name="passport_issued_by">
              <Input placeholder="IIB" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Berilgan sana" name="passport_issued_date">
              <Input type="date" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* Qo'shimcha */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">
          Qo'shimcha ma'lumotlar
        </p>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Kim orqali kelgan" name="referred_by">
              <Input placeholder="Do'st, qarindosh..." size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ish joyi" name="workplace">
              <Input placeholder="Kompaniya nomi" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Kafil ismi" name="guarantor_name">
              <Input placeholder="Familiya Ism" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Kafil telefon" name="guarantor_phone">
              <Input placeholder="+998 90 123 45 67" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
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
