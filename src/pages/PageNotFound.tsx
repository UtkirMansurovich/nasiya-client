import { type FC, type JSX } from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound: FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--primary-hover) p-4">
      <div
        className="max-w-md w-full bg-(--primary) p-10 rounded-2xl text-center"
        style={{ boxShadow: "var(--shadow-bottom)" }}
      >
        {/* 404 Raqami */}
        <h1 className="text-9xl font-black text-(--secondary) opacity-20">
          404
        </h1>

        <div className="relative -mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sahifa topilmadi
          </h2>
          <p className="text-gray-500 mb-8">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirib
            yuborilgan.
          </p>
        </div>

        {/* Tugmalar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-(--secondary) text-(--secondary) hover:bg-(--secondary-hover)"
          >
            Orqaga qaytish
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-(--secondary) text-white hover:opacity-90"
            style={{ boxShadow: "var(--shadow-bottom)" }}
          >
            Bosh sahifaga o'tish
          </button>
        </div>
      </div>
    </div>
  );
};
