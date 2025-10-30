"use client";

import React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const CustomToast = ({
  type = "info",
  title,
  message,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconBg: "bg-green-500",
          icon: CheckCircle,
          iconColor: "text-white",
        };
      case "error":
        return {
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          iconBg: "bg-red-500",
          icon: X,
          iconColor: "text-white",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconBg: "bg-yellow-500",
          icon: AlertTriangle,
          iconColor: "text-white",
        };
      case "info":
      default:
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconBg: "bg-blue-500",
          icon: Info,
          iconColor: "text-white",
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={`${config.bgColor} ${
        config.borderColor
      } border rounded-lg p-4 shadow-sm transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 z-1000"
      }`}
      style={{ minWidth: "320px", maxWidth: "400px" }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`${config.iconBg} ${config.iconColor} rounded-full p-1 shrink-0`}
        >
          <IconComponent size={16} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm mb-1 font-inter">
            {title}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed font-inter">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="shrink-0 p-1 rounded hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          aria-label="Close notification"
        >
          <X size={14} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
