import React from "react";

function FormButtons({ handleBackStep, selectedCharacter }) {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-4 mt-12">
      <button
        type="button"
        onClick={handleBackStep}
        className="w-full md:w-1/2 rounded-full bg-transparent text-text-secondary border-text-secondary border-2 font-semibold py-3 text-md transition-all duration-300 cursor-pointer hover:text-white hover:border-white hover:scale-95 flex items-center justify-center gap-2"
      >
        Back
      </button>

      <button
        type="button"
        disabled={!selectedCharacter}
        className={`w-full md:w-1/2 rounded-full border-2 border-surface bg-surface text-white font-semibold py-3 text-md transition-all duration-300  flex items-center justify-center gap-2 ${
          !selectedCharacter
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer hover:bg-accent-primary hover:border-accent-primary hover:scale-95"
        }`}
      >
        Start
      </button>
    </div>
  );
}

export default FormButtons;
