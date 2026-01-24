import React from "react";
import lineArrowRight from "../../assets/icons/lineArrowRight.svg"; // replace with your arrow svg

interface RegularCardProps {
  symbol: string;          // EURUSD
  showSL?: boolean;        // true → show SL badge
  showTP?: boolean;        // true → show TP badge
  fromPrice: string;       // 0.0670
  toPrice: string;         // 0.0690
  orderType: string;       // Buy limit
  quantity: string;        // 0.01
  dateTime: string;        // 03/11/2025 15:39
}

const RegularCard: React.FC<RegularCardProps> = ({
  symbol,
  showSL = true,
  showTP = false,
  fromPrice,
  toPrice,
  orderType,
  quantity,
  dateTime,
}) => {
  return (
    <div
      className="
        w-[412px] h-[73px]
        bg-[#0D0D0D]
        border-b border-[#181818]
        px-[20px] py-[10px]
        flex flex-col
      "
    >
      <div className="w-full h-[53px] flex flex-col">
        
        {/* ---------- TOP ROW ---------- */}
        <div className="flex justify-between items-center py-[4px]">
          
          {/* Left */}
          <div className="flex items-center gap-[6px]">
            <span className="font-poppins font-semibold text-[14px] text-[#D9D9D9]">
              {symbol}
            </span>

            {showTP && (
              <span className="w-[18px] h-[18px] flex items-center justify-center bg-[#2D2D2D] rounded-[4px] text-[12px] text-[#878787]">
                TP
              </span>
            )}

            {showSL && (
              <span className="w-[18px] h-[18px] flex items-center justify-center bg-[#181818] rounded-[4px] text-[12px] text-[rgba(135,135,135,0.6)]">
                SL
              </span>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-[10px]">
            <span className="text-[14px] font-normal text-[rgba(135,135,135,0.6)]">
              {fromPrice}
            </span>

            <img src={lineArrowRight} className="w-[24px] h-[24px] " />

            <span className="text-[14px] font-semibold text-[#D9D9D9]">
              {toPrice}
            </span>
          </div>
        </div>

        {/* ---------- BOTTOM ROW ---------- */}
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-[10px]">
            <span className="text-[14px] font-normal text-[#D9D9D9]">
              {orderType}
            </span>
            <span className="text-[14px] font-normal text-[rgba(135,135,135,0.6)]">
              {quantity}
            </span>
          </div>

          <span className="text-[14px] font-normal text-[#D9D9D9] text-right">
            {dateTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegularCard;
