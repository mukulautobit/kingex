import React from "react";

interface HistoryRegularCardProps {
  symbol: string;        // EURUSD
  dateTime: string;      // 2025.09.15 | 09:05:47
  qtyLabel?: string;     // Buy Qty:
  qtyValue: string;      // 11.00 at market
  status: string;        // FILLED
}

const HistoryRegularCard: React.FC<HistoryRegularCardProps> = ({
  symbol,
  dateTime,
  qtyLabel = "Buy Qty:",
  qtyValue,
  status,
}) => {
  return (
    <div
      className="
        w-[412px] h-[104px]
        bg-[#0D0D0D]
        border-b border-[#181818]
        px-[20px] py-[10px]
        flex flex-col
      "
    >
      <div className="w-full h-[84px] flex flex-col">
        
        {/* ---------- TOP ROW ---------- */}
        <div className="flex justify-between items-center h-[33px]">
          <span className="font-poppins font-semibold text-[14px] text-grayprimary">
            {symbol}
          </span>

          <span className="font-poppins font-normal text-[12px] text-grayprimary">
            {dateTime}
          </span>
        </div>

        {/* ---------- BOTTOM ROW ---------- */}
        <div className="flex justify-between h-[51px]">
          
          {/* Left */}
          <div className="flex flex-col justify-center">
            <span className="text-[12px] text-[rgba(135,135,135,0.6)]">
              {qtyLabel}
            </span>
            <span className="text-[14px] text-grayprimary">
              {qtyValue}
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center text-right">
            <span className="text-[12px] text-[rgba(135,135,135,0.6)]">
              Status
            </span>
            <span className="text-[14px] text-grayprimary">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryRegularCard;
