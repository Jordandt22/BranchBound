import React from "react";

function FormSection({ label, children }) {
  return (
    <div className="mb-12">
      <label className="block text-white font-semibold text-lg mb-4">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-4">{children}</div>
    </div>
  );
}

export default FormSection;
