import { BatteryFull, SignalHigh, WifiHigh } from "lucide-react";

function NetworkBar() {
  return (
    <div className="w-full h-[40px] flex justify-between items-center px-3">
      <div>
        <p className="text-sm font-medium ml-4 flex items-center">9:41</p>
      </div>
      <div className="flex items-center gap-0.5 pr-2">
        <SignalHigh size={20} />
        <WifiHigh size={20} />
        <BatteryFull size={20} className="mt-1" />
      </div>
    </div>
  );
}

export default NetworkBar;
