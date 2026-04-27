import { useEffect, useRef, type FC, type JSX } from "react";
import { useLogout } from "../hooks/useLogout";

interface LogoutModalProps {
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const LogoutModal: FC<LogoutModalProps> = ({
  onClose,
  buttonRef,
}): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        // Don't close if clicking on the button
        if (
          buttonRef.current &&
          buttonRef.current.contains(event.target as Node)
        ) {
          return;
        }
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <div
      ref={modalRef}
      className="absolute right-0 top-full mt-2 w-[220px] rounded-2xl border border-gray-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden z-50"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900">Asosiy filial</p>
        <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">
          Administrator
        </p>
      </div>
      <button
        type="button"
        onClick={logout}
        className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Chiqish
      </button>
    </div>
  );
};
