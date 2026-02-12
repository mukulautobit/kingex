import React from "react";

export interface PositionCardProps {
  symbol: string;        // EURUSD
  profit: number;        // +0.58
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
        w-103 h-17.5
        bg-bgprimary
        border-b border-blacksecondary
        px-5 py-2.5
        flex flex-col
      "
    >
      <div className="flex items-center gap-2.5 w-full h-12.5">
        
        {/* Flags */}
        <div className="relative w-8.25 h-7.25">
          <img
            src={flag1}
            className="absolute w-6 h-6 rounded-full border border-grayprimary"
          />
          <img
            src={flag2}
            className="absolute left-2.25 top-1.5 w-6 h-6 rounded-full border border-grayprimary"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full h-full">
          
          {/* Top row */}
          <div className="flex items-center justify-between py-1">
            <span className="font-poppins font-medium text-[14px] text-grayprimary">
              {symbol}
            </span>

            <span
              className={`font-poppins font-medium text-[14px] ${
                profitPositive ? "text-[#00B306]" : "text-red-500"
              }`}
            >
              {profit?profit: "No Availabel"}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className="font-poppins font-normal text-[14px] text-grayprimary">
              {type}
            </span>

            <span className="font-poppins font-normal text-[14px] text-grayprimary text-right">
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
