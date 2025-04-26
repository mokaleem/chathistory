import { FiChevronLeft, FiPhone, FiVideo } from "react-icons/fi";
import React from "react";

function NameBar() {
  return (
    <div className="w-full px-2 py-2 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FiChevronLeft className="w-7 h-7 text-blue-500" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              {/* Placeholder for profile image */}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">Martha Craig</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mr-2">
          <FiVideo className="w-6 h-6 text-blue-500" />
          <FiPhone className="w-5 h-5 text-blue-500" />
        </div>
      </div>
    </div>
  );
}

export default NameBar;
