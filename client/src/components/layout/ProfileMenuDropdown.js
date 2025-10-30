import React from "react";
import Link from "next/link";
import { Settings, LogOut } from "lucide-react";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

function ProfileMenuDropdown() {
  const {
    sidebarState: { isCollapsed },
    toggleProfileMenu,
  } = useGlobal();
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
    toggleProfileMenu(false);
    toggleMobileSidebar(false);
  };

  return (
    <div className="space-y-2 mt-2 animate-fade-in w-full">
      <Link
        href="/settings"
        className={`w-full flex items-center p-2 gap-2 text-sm text-gray-300 hover:text-white bg-gray-700/35 hover:bg-gray-700 transition-all duration-200 rounded-md ${
          isCollapsed ? "justify-center hover:scale-90" : "hover:scale-95 "
        }`}
        onClick={() => toggleProfileMenu(false)}
      >
        <Settings size={16} className="text-gray-400" />
        {!isCollapsed && <span>Settings</span>}
      </Link>
      <button
        onClick={handleLogout}
        className={`w-full flex items-center p-2 gap-2 text-sm text-gray-300 hover:text-white bg-gray-700/35 hover:bg-gray-700 transition-all duration-200 rounded-md cursor-pointer ${
          isCollapsed ? "justify-center hover:scale-90" : "hover:scale-95 "
        }`}
      >
        <LogOut size={16} className="text-gray-400" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
}

export default ProfileMenuDropdown;
