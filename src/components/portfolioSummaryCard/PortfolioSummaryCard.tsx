import lossDownArrow from "../../assets/icons/lossDownArrow.svg";

interface PortfolioSummaryCardProps {
  totalValue: number;
  overallPnL: number;
  investedValue: number;
  todaysGain: number;
  todaysGainPercent: number;

  stockName: string;
  quantity: number;
  atp: number;
  stockPnL: number;
  stockPnLPercent: number;
  ltp: number;
  ltpPercent: number;
}

const PortfolioSummaryCard = ({
  totalValue,
  overallPnL,
  investedValue,
  todaysGain,
  todaysGainPercent,
  stockName,
  quantity,
  atp,
  stockPnL,
  stockPnLPercent,
  ltp,
  ltpPercent,
}: PortfolioSummaryCardProps) => {
  const isLoss = overallPnL < 0;

  return (
    <div className="w-full max-w-[412px] mx-auto px-5 py-5 flex flex-col gap-5">

      {/* ================= MAIN CARD ================= */}
      <div className="rounded-[20px] border border-[#272727] bg-gradient-to-r from-[#1D1A23] via-[#292531] to-[#1D1A23]">

        {/* ===== TOP SECTION ===== */}
        <div className="px-5 py-4 flex flex-col gap-1">

          {/* Total Value */}
          <p className="text-[21px] text-[#D9D9D9] font-normal">
            ₹{totalValue.toFixed(2)}
          </p>

          {/* Overall PnL */}
          <div className="flex items-center gap-1 text-[12px]">
            <span className={`${isLoss ? "text-[#BF3333]" : "text-[#33BF90]"}`}>
              {isLoss ?( 
                <img 
                src={lossDownArrow}
                className="w-4.5 h-4.5"
                />
            ) :( 
                "↑")}
            </span>

            <span className="text-[#D9D9D9]">
              {isLoss ? "Overall Loss" : "Overall Gain"}
            </span>

            <span className={`${isLoss ? "text-[#BF3333]" : "text-[#33BF90]"}`}>
              ₹{Math.abs(overallPnL).toFixed(2)}
            </span>
          </div>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="border-t border-[#292531] px-5 py-3 flex justify-between">

          {/* Invested */}
          <div className="flex flex-col">
            <span className="text-[12px] text-[#D9D9D9] font-light">
              Invested Value
            </span>
            <span className="text-[12px] text-[#D9D9D9] font-semibold">
              ₹{investedValue}
            </span>
          </div>

          {/* Today Gain */}
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[#D9D9D9] font-light">
              Today’s Gain
            </span>
            <span className="text-[12px] font-medium text-[#33BF90]">
              ₹{todaysGain} ({todaysGainPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* ================= STOCK ROW ================= */}
      <div className="flex items-center gap-5 py-3 border-b border-[#272727]">

        {/* Left side */}
        <div className="flex flex-col">
          <p className="text-[14px] text-[#D9D9D9]">
            {stockName}
          </p>
          <p className="text-[12px] text-[#D9D9D9] font-light">
            {quantity} x ATP ₹{atp}
          </p>
        </div>

        {/* Right side */}
        <div className="ml-auto flex flex-col items-end">
          <p className="text-[14px] font-medium text-[#33BF90]">
            ₹{stockPnL} ({stockPnLPercent}%)
          </p>
          <p className="text-[12px] text-[#D9D9D9] font-light">
            LTP ₹{ltp} ({ltpPercent}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;
