"use client";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useGlobal } from "@/contexts/Global.context";

export default function Home() {
  const { signOut } = useAuth();
  const { showError, showSuccess, showWarning, showInfo } = useGlobal();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <a href="/signup">Signup</a>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <button
          className="cursor-pointer bg-white px-8 py-2 rounded-md text-black font-medium hover:bg-gray-300 transition-all duration-200"
          onClick={async () => await signOut()}
        >
          Signout
        </button>
        <button
          className="cursor-pointer bg-red-500 px-8 py-2 rounded-md text-white font-medium hover:bg-red-600 transition-all duration-200"
          onClick={() =>
            showError("Something went wrong! Please try again.", "Error")
          }
        >
          Test Error Toast
        </button>
        <button
          className="cursor-pointer bg-green-500 px-8 py-2 rounded-md text-white font-medium hover:bg-green-600 transition-all duration-200"
          onClick={() =>
            showSuccess("Your operation completed successfully!", "Success")
          }
        >
          Test Success Toast
        </button>
        <button
          className="cursor-pointer bg-yellow-500 px-8 py-2 rounded-md text-white font-medium hover:bg-yellow-600 transition-all duration-200"
          onClick={() =>
            showWarning("Please check your password strength.", "Warning")
          }
        >
          Test Warning Toast
        </button>
        <button
          className="cursor-pointer bg-blue-500 px-8 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-all duration-200"
          onClick={() =>
            showInfo(
              "You can use Ctrl + T to switch between artboards.",
              "Did you know?"
            )
          }
        >
          Test Info Toast
        </button>
      </div>
    </div>
  );
}
