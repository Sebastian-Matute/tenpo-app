import React, { ReactNode } from "react";

type AlertProps = {
  title?: ReactNode;
  children?: ReactNode;
  color?: "danger" | "success" | "info" | "alert" | string;
};

const colorMap: Record<string, string> = {
  danger: "bg-red-100 border-red-400 text-red-700",
  success: "bg-green-100 border-green-400 text-green-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  alert: "bg-yellow-100 border-yellow-400 text-yellow-700",
};

export default function Alert({ title, children, color = "red" }: AlertProps) {
  const colorClasses = colorMap[color] || colorMap.red;

  return (
    <div className={`${colorClasses} min-w-xs px-4 py-3 rounded relative`}>
      <div className="flex flex-col">
        {title && <strong className="font-bold text-lg">{title}</strong>}
        {children}
      </div>
    </div>
  );
}
