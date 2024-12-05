import React from "react";

function Phone() {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="w-[148px] h-[18px] bg-gray-800 rounded-[1rem] left-1/2 -translate-x-1/2 absolute top-1"></div>
      <div className="h-[32px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -end-[12px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[280px] h-[580px] !bg-white dark:bg-gray-800 z-10"></div>
    </div>
  );
}

export default Phone;
