import { useEffect, useRef, useState } from "react";

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

  const prevPnlRef = useRef<number>(pnl);
  const [pnlState, setPnlState] = useState<"up" | "down" | "same">("same");

  useEffect(() => {
    const prev = Number(prevPnlRef.current);
    const current = Number(pnl);

    if (current > prev) setPnlState("up");
    else if (current < prev) setPnlState("down");
    else setPnlState("same");

    prevPnlRef.current = current;
  }, [pnl]);

  const colorClass =
    pnlState === "up"
      ? "text-greenshadeone"
      : pnlState === "down"
      ? "text-redsecondary"
      : "text-grayprimary";

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-blacksecondary">

      {/* LEFT */}
      <div className="flex flex-col gap-0.5">
        <span className="text-white text-[13px] font-medium">
          {tradeName}
        </span>

        <span className="text-[#8E8E8E] text-[11px] font-light">
          {exchange} | {formatTime(timestamp)}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-[2px]">
        <span className={`text-[14px] font-medium ${colorClass}`}>
          {typeof ltp === "number" ? ltp.toLocaleString() : "--"}
        </span>

        <span className={`text-[11px] font-light ${colorClass}`}>
          {pnl > 0 ? "+" : ""}
          {Number(pnl).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CommoditiesItem;
