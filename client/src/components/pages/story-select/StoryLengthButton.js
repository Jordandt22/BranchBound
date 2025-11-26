import React from "react";

// Icons
import { Clock, Lock } from "lucide-react";

function StoryLengthButton({
  onClick,
  text,
  isActive,
  subText,
  isLocked = false,
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
      className={`text-sm flex-1 px-2 py-3 rounded-full border-2 transition-all duration-300 font-medium flex flex-col items-center gap-1 ${
        isLocked ? lockedClass : isActive ? activeClass : inactiveClass
      } ${!isLocked ? "hover:scale-95 cursor-pointer" : ""}`}
    >
      <div className="flex items-center gap-2">
        {isLocked ? <Lock size={18} /> : <Clock size={18} />}
        <span>{text}</span>
      </div>
      <span className="text-xs opacity-75">{subText}</span>
    </button>
  );
}

export default StoryLengthButton;
