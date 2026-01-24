import React from "react";

export interface PositionCardProps {
  symbol: string;        // EURUSD
  profit: string;        // +0.58
  profitPositive?: boolean;
  type: string;          // Buy 0.01
  time: string;          // 2025.09.15 | 09:05:47
  flag1: string;         // left flag image
  flag2: string;         // right flag image
}

const PositionCard: React.FC<PositionCardProps> = ({
  symbol,
  profit,
  profitPositive = true,
  type,
  time,
  flag1,
  flag2,
}) => {
  return (
    <div
      className="
        w-[412px] h-[70px]
        bg-[#0D0D0D]
        border-b border-[#181818]
        px-[20px] py-[10px]
        flex flex-col
      "
    >
      <div className="flex items-center gap-[10px] w-full h-[50px]">
        
        {/* Flags */}
        <div className="relative w-[33px] h-[29px]">
          <img
            src={flag1}
            className="absolute w-[24px] h-[24px] rounded-full border border-[#D9D9D9]"
          />
          <img
            src={flag2}
            className="absolute left-[9px] top-[6px] w-[24px] h-[24px] rounded-full border border-[#D9D9D9]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full h-full">
          
          {/* Top row */}
          <div className="flex items-center justify-between py-[4px]">
            <span className="font-poppins font-[500] text-[14px] text-[#D9D9D9]">
              {symbol}
            </span>

            <span
              className={`font-poppins font-[500] text-[14px] ${
                profitPositive ? "text-[#00B306]" : "text-red-500"
              }`}
            >
              {profit}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className="font-poppins font-[400] text-[14px] text-[#D9D9D9]">
              {type}
            </span>

            <span className="font-poppins font-[400] text-[14px] text-[#D9D9D9] text-right">
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
