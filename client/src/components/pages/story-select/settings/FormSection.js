import React from "react";

function FormSection({ label, children }) {
  return (
    <div className="mb-12">
      <label className="block font-semibold text-md mb-4 text-gray-300">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-4">{children}</div>
    </div>
  );
}

export default FormSection;
