import React from "react";
import NetworkBar from "./NetworkBar";
import NameBar from "./NameBar";
import Background from "./Background";
import { PhoneMessagesClient } from "./PhoneMessagesClient";

function Phone() {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[607px] w-[320px] phone-area-component">
      <div className="w-[90px] h-[28px] bg-gray-800 rounded-[1rem] left-1/2 -translate-x-1/2 absolute top-1"></div>
      <div className="h-[32px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -end-[12px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[302px] h-[587px] !bg-white z-10">
        <NetworkBar />
        <NameBar />
        <Background />
        <div className="h-[calc(100%-80px)] overflow-y-auto">
          <PhoneMessagesClient />
        </div>
      </div>
    </div>
  );
}

export default Phone;
