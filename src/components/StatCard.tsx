import { type FC } from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  color: string;
  bg: string;
}

const StatCard: FC<StatCardProps> = ({ label, value, sub, color, bg }) => (
  <div className={`${bg} rounded-xl p-4 border border-white/60 shadow-sm`}>
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className={`text-xl font-black ${color} leading-tight`}>{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
  </div>
);

export default StatCard;
