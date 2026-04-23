import { useState, type FC, type JSX } from "react";
import { Form, Input, Select, Button, Checkbox, message } from 'antd'
import { FiCreditCard, FiHome, FiUser, FiLock, FiLogIn } from 'react-icons/fi'

const branches = [
    { value: 'main', label: 'Asosiy filial — Zarifa opa' },
    { value: 'chilonzor', label: "Go'zal opa" },
    { value: 'yunusobod', label: 'Saoday opa' },
    { value: 'mirzo', label: 'Shohruz' },
]

export const Login: FC = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm()

    const handleSubmit = async (values: Record<string, unknown>) => {
        setLoading(true)
        try {
            // TODO: replace with real API call
            await new Promise((res) => setTimeout(res, 1500))
            message.success('Tizimga muvaffaqiyatli kirdingiz!')
            console.log('Login values:', values)
            // navigate('/dashboard')
        } catch {
            message.error('Login yoki parol noto\'g\'ri!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA] sm:flex sm:items-center sm:justify-center p-0 sm:p-4">
            <div className="w-full max-w-[880px] rounded-none sm:rounded-2xl overflow-hidden shadow-lg flex flex-col sm:flex-row sm:h-auto sm:min-h-[520px]">

                {/* ── Left: Branding ── */}
                <div className="flex w-full sm:w-[46%] bg-[#1677FF] flex-col items-center py-8 px-6 justify-center relative overflow-hidden">

                    {/* Decorative circles */}
                    <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full border border-white/10" />
                    <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full border border-white/[0.07]" />

                    {/* Logo */}
                    <div className="p-[12px_11px] bg-white/20 rounded-xl flex items-center justify-center mb-6 z-10">
                        <FiCreditCard size={30} color="#ffffff" />
                    </div>

                    <h1 className="text-white text-2xl font-semibold text-center leading-snug mb-3 z-10">
                        Nasiya Savdo<br />Boshqaruv Tizimi
                    </h1>

                    <p className="text-white/70 text-sm text-center leading-relaxed z-10">
                        Mijozlar, nasiyalar va to'lovlarni<br />oson va tez boshqaring
                    </p>

                    <div className="flex gap-2 mt-8 z-10">
                        {['Mijozlar', 'Nasiya', 'Hisobot'].map((tag) => (
                            <span
                                key={tag}
                                className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Right: Form ── */}
                <div className="flex-1 bg-white flex flex-col justify-center px-8 py-0 sm:py-12 sm:px-12">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Tizimga kirish</h2>
                        <p className="text-sm text-gray-400 mt-1">Hisobingizga kiring davom etish uchun</p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}
                        initialValues={{ remember: true, branch: 'main' }}
                    >

                        {/* Branch */}
                        <Form.Item
                            name="branch"
                            label={<span className="text-xs font-medium text-gray-500">Filial tanlang</span>}
                            rules={[{ required: true, message: 'Filialni tanlang' }]}
                        >
                            <Select
                                size="large"
                                suffixIcon={<FiHome size={14} color="#aaa" />}
                                options={branches}
                                className="w-full"
                            />
                        </Form.Item>

                        {/* Username */}
                        <Form.Item
                            name="username"
                            label={<span className="text-xs font-medium text-gray-500">Login</span>}
                            rules={[{ required: true, message: 'Login kiriting' }]}
                        >
                            <Input
                                size="large"
                                prefix={<FiUser size={15} color="#aaa" className="mr-1" />}
                                placeholder="Login kiriting"
                                autoComplete="username"
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            className="[&_.ant-form-item-label>label]:w-full"
                            label={
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">Parol</span>
                                    <a href="#" className="text-xs text-[#1677FF] hover:underline">
                                        Parolni unutdingizmi?
                                    </a>
                                </div>
                            }
                            rules={[{ required: true, message: 'Parol kiriting' }]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<FiLock size={15} color="#aaa" className="mr-1" />}
                                placeholder="Parol kiriting"
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        {/* Remember me */}
                        <Form.Item name="remember" valuePropName="checked" className="mb-6">
                            <Checkbox>
                                <span className="text-sm text-gray-500">Tizimda qolish</span>
                            </Checkbox>
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                icon={!loading && <FiLogIn size={16} />}
                                className="w-full h-11 font-semibold text-sm"
                            >
                                {loading ? 'Yuklanmoqda...' : 'Kirish'}
                            </Button>
                        </Form.Item>

                    </Form>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        v1.0.0 &nbsp;·&nbsp; Nasiya Savdo Boshqaruv Tizimi
                    </p>

                </div>
            </div>
        </div>
    )
} 