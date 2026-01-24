import React from "react";

interface CommoditiesItemProps {
  tradeName: string;
  exchange: string;
  ltp: number;
  pnl: number;
  timestamp: number;
}

const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const CommoditiesItem = ({
  tradeName,
  exchange,
  ltp,
  pnl,
  timestamp,
}: CommoditiesItemProps) => {
  const isProfit = pnl >= 0;

  return (
    <div className="flex items-center justify-between py-[10px] border-b border-[#181818]">
      
      {/* LEFT */}
      <div className="flex flex-col gap-[2px]">
        <span className="text-white text-[13px] font-medium">
          {tradeName}
        </span>

        <span className="text-[#8E8E8E] text-[11px] font-light">
          {exchange} | {formatTime(timestamp)}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-[2px]">
        <span
          className={`text-[14px] font-medium ${
            isProfit ? "text-[#00B306]" : "text-[#FF3B30]"
          }`}
        >
           {(ltp ?? 0).toLocaleString()}
        </span>

        <span
          className={`text-[11px] font-light ${
            isProfit ? "text-[#00B306]" : "text-[#FF3B30]"
          }`}
        >
          {pnl > 0 ? "+" : ""}
           {(pnl ?? 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CommoditiesItem;
