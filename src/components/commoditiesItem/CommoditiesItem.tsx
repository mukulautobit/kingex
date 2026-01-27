import { useEffect, useRef } from "react";

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

  // store previous pnl
  const prevPnlRef = useRef<number | null>(null);

  // determine pnl direction
  let pnlState: "up" | "down" | "same" = "same";

  if (prevPnlRef.current !== null) {
    if (pnl > prevPnlRef.current) pnlState = "up";
    else if (pnl < prevPnlRef.current) pnlState = "down";
  }

  // update previous pnl AFTER render
  useEffect(() => {
    prevPnlRef.current = pnl;
  }, [pnl]);

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
            pnlState === "up"
              ? "text-[#00B306]"
              : pnlState === "down"
              ? "text-[#FF3B30]"
              : "text-white"
          }`}
        >
          {ltp.toLocaleString()}
        </span>

        <span
          className={`text-[11px] font-light ${
            pnlState === "up"
              ? "text-[#00B306]"
              : pnlState === "down"
              ? "text-[#FF3B30]"
              : "text-[#8E8E8E]"
          }`}
        >
          {pnl > 0 ? "+" : ""}
          {pnl.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CommoditiesItem;
