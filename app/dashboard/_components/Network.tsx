import { BatteryFull, SignalHigh, WifiHigh } from "lucide-react";

function Network() {
  return (
    <div className="w-full h-3 flex items-center m-3 pl-3">
      <div>
        <p className="text-sm ml-3 mt-1">9:41</p>
      </div>
      <div className="flex gap-0.5 mr-[28px] align-center justify-center">
        <SignalHigh size={20} className="mb-1" />
        <WifiHigh size={20} className="mb-1" />
        <BatteryFull size={20} />
      </div>
    </div>
  );
}

export default Network;
