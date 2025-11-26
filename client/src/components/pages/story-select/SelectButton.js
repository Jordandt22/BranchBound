import React from "react";

// Icons
import { Lock } from "lucide-react";

function SelectButton({
  onClick,
  text,
  isActive,
  isLocked = false,
  icon: Icon,
}) {
  const activeClass =
    "bg-accent-primary/20 border-accent-primary text-white shadow-button";
  const inactiveClass =
    "bg-surface/50 border-gray-800/50 text-text-secondary hover:border-accent-primary/50 hover:bg-surface/70";
  const lockedClass =
    "bg-gray-700/50 border-gray-700 text-gray-400 cursor-not-allowed";

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLocked}
      className={`text-sm flex-1 px-2 py-3 rounded-full border-2 transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
        isLocked ? lockedClass : isActive ? activeClass : inactiveClass
      } ${!isLocked ? "hover:scale-95 cursor-pointer" : ""}`}
    >
      {Icon && <Icon size={18} />}
      {text}
      {isLocked && <Lock size={16} />}
    </button>
  );
}

export default SelectButton;
