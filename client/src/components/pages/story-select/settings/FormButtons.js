import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function FormButtons({ story, handleNextStep }) {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-4 mt-8 md:mt-16">
      <button
        type="button"
        onClick={() => router.push("/story/" + story.slug)}
        className="w-full md:w-1/2 rounded-full bg-transparent text-text-secondary border-text-secondary border-2 font-semibold py-3 text-md transition-all duration-300 cursor-pointer hover:text-white hover:border-white hover:scale-95 flex items-center justify-center gap-2"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full md:w-1/2 rounded-full border-2 border-surface bg-surface hover:bg-accent-primary hover:border-accent-primary text-white font-semibold py-3 text-md transition-all duration-300 cursor-pointer hover:scale-95 flex items-center justify-center gap-2"
      >
        Next
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default FormButtons;
