import { type FC, type JSX } from "react"
import { BellOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons"

export const Header: FC = (): JSX.Element => {
    return (
        <header className="row-start-1 row-end-2 col-start-1 col-end-3 h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-20 transition-all">
            {/* Left side: Logo/Title & Search */}
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-(--secondary) text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
                        N
                    </div>
                    <span className="text-gray-800 text-[20px] font-bold tracking-tight hidden sm:block">Nasiya Savdo</span>
                </div>
                
                {/* Search Bar - hidden on mobile */}
                <div className="hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all w-[320px]">
                    <SearchOutlined className="text-gray-400 text-lg" />
                    <input 
                        type="text" 
                        placeholder="Mijozlar, mahsulotlar qidiruvi..." 
                        className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400 font-medium"
                    />
                </div>
            </div>

            {/* Right side: Actions & Profile */}
            <div className="flex items-center gap-6">
                <button className="relative p-2.5 text-gray-400 hover:text-(--secondary) hover:bg-blue-50 rounded-full transition-colors">
                    <BellOutlined className="text-xl" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border border-white rounded-full animate-ping"></span>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border border-white rounded-full"></span>
                </button>
                
                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-(--secondary) font-bold text-[16px] uppercase flex items-center justify-center border border-blue-100 shadow-sm">
                        A
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-gray-800 text-sm font-bold leading-tight">Asosiy filial</span>
                        <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mt-0.5">Administrator</span>
                    </div>
                    <DownOutlined className="text-gray-400 text-xs ml-1" />
                </div>
            </div>
        </header>
    )
}