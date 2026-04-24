import { useState, type FC, type JSX } from "react";
import { FiCreditCard, FiHome, FiUser, FiLock, FiLogIn } from 'react-icons/fi';

const branches = [
    { value: 'main', label: 'Asosiy filial — Zarifa opa' },
    { value: 'chilonzor', label: "Go'zal opa" },
    { value: 'yunusobod', label: 'Saodat opa' },
    { value: 'mirzo', label: 'Shohruz' },
];

export const Login: FC = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise((res) => setTimeout(res, 1500));
            alert('Tizimga muvaffaqiyatli kirdingiz!'); // In production, replace with real toast/navigate
            // navigate('/dashboard')
        } catch {
            alert('Login yoki parol noto\'g\'ri!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
            <div className="w-full max-w-[960px] bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/5 flex flex-col sm:flex-row min-h-[600px] animate-fade-in border border-gray-100/50">

                {/* ── Left: Branding ── */}
                <div className="hidden sm:flex w-[45%] bg-gradient-to-br from-(--secondary) to-indigo-800 flex-col items-center py-12 px-8 justify-center relative overflow-hidden">
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                    
                    <div className="absolute top-12 left-12 w-24 h-24 border border-white/10 rounded-full"></div>
                    <div className="absolute bottom-24 right-12 w-40 h-40 border border-white/5 rounded-full"></div>

                    {/* Logo */}
                    <div className="p-4 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-8 z-10 shadow-lg ring-1 ring-white/20">
                        <FiCreditCard size={40} strokeWidth={1.5} />
                    </div>

                    <h1 className="text-white text-[32px] font-black text-center leading-[1.1] mb-5 z-10 tracking-tight">
                        Nasiya Savdo<br />Boshqaruv Tizimi
                    </h1>

                    <p className="text-blue-100/80 text-[15px] text-center leading-relaxed z-10 font-medium max-w-[260px]">
                        Mijozlar, nasiyalar va to'lovlarni oson hamda tezkor boshqaring.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mt-12 z-10">
                        {['Mijozlar', 'Nasiya', 'Hisobot'].map((tag) => (
                            <span
                                key={tag}
                                className="bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-sm text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Right: Form ── */}
                <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-16 relative">
                    <div className="max-w-[400px] w-full mx-auto">
                        
                        {/* Mobile Logo */}
                        <div className="sm:hidden w-14 h-14 bg-blue-50 text-(--secondary) rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-blue-100">
                            <FiCreditCard size={28} />
                        </div>

                        <div className="mb-10">
                            <h2 className="text-[28px] font-black text-gray-800 tracking-tight">Xush kelibsiz!</h2>
                            <p className="text-[15px] text-gray-500 mt-2 font-medium">Hisobingizga kirish uchun ma'lumotlarni to'ldiring</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Branch */}
                            <div className="flex flex-col gap-2.5">
                                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Filial</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiHome size={18} />
                                    </div>
                                    <select required defaultValue="" className="bg-gray-50 border border-gray-200 text-gray-800 text-[15px] rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full pl-11 p-4 transition-all outline-none font-semibold appearance-none cursor-pointer">
                                        <option value="" disabled hidden>Filialni tanlang...</option>
                                        {branches.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="flex flex-col gap-2.5">
                                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Login</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiUser size={18} />
                                    </div>
                                    <input required type="text" placeholder="Login kiriting" className="bg-gray-50 border border-gray-200 text-gray-800 text-[15px] rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full pl-11 p-4 transition-all outline-none font-semibold placeholder-gray-400" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Parol</label>
                                    <a href="#" className="text-[13px] font-bold text-(--secondary) hover:text-blue-500 transition-colors">
                                        Parolni unutdingizmi?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiLock size={18} />
                                    </div>
                                    <input required type="password" placeholder="Parol kiriting" className="bg-gray-50 border border-gray-200 text-gray-800 text-[15px] rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full pl-11 p-4 transition-all outline-none font-semibold placeholder-gray-400" />
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-3 mt-1">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" id="remember" className="peer w-[22px] h-[22px] cursor-pointer appearance-none rounded-lg border-2 border-gray-300 checked:bg-(--secondary) checked:border-(--secondary) transition-all" defaultChecked />
                                    <svg className="absolute w-3.5 h-3.5 pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <label htmlFor="remember" className="text-[15px] font-semibold text-gray-600 cursor-pointer select-none">
                                    Tizimda qolish
                                </label>
                            </div>

                            {/* Submit */}
                            <button disabled={loading} type="submit" className="mt-4 bg-(--secondary) hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 text-[16px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none group">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <FiLogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                                )}
                                {loading ? 'Tizimga kirilmoqda...' : 'Tizimga kirish'}
                            </button>

                        </form>

                        <div className="mt-12 text-center border-t border-gray-100 pt-6">
                            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                                Nasiya Savdo Boshqaruv Tizimi <span className="text-gray-300">·</span> v1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}