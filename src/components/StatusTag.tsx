import { type FC } from "react";
import { Tag } from "antd";

interface StatusTagProps {
  status: string;
}

const statusMap: Record<string, { color: string; text: string }> = {
  active: { color: "blue", text: "Aktiv" },
  completed: { color: "green", text: "Tugagan" },
  defaulted: { color: "red", text: "Muddati o'tgan" },
  none: { color: "default", text: "Nasiya yo'q" },
};

const StatusTag: FC<StatusTagProps> = ({ status }) => {
  const { color, text } = statusMap[status] || {
    color: "default",
    text: status,
  };
  return <Tag color={color}>{text}</Tag>;
};

export default StatusTag;
