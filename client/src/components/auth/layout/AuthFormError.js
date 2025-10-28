import React from "react";

function AuthFormError({ error }) {
  return (
    <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl text-sm animate-slide-in shadow-error text-center">
      {error}
    </div>
  );
}

export default AuthFormError;
