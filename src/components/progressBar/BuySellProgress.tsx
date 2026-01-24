interface BuySellProgressProps {
  buyPercent: number;   
  sellPercent: number; 
  buyQty: string;      
  sellQty: string;     
}

export default function BuySellProgress({
  buyPercent,
  sellPercent,
  buyQty,
  sellQty,
}: BuySellProgressProps) {
  return (
    <div
      className="
        w-full max-w-[412px]
        py-[10px]
        flex flex-col gap-[10px]
      "
    >
      {/* Titles */}
      <div className="flex justify-between px-[10px] text-[12px] text-[#D1C3C3]">
        <span className="font-light">Total buy Qty.</span>
        <span className="font-light">Total sell qty.</span>
      </div>

      {/* Values */}
      <div className="flex justify-between px-[10px]">
        <span className="text-[14px] font-medium text-[#D1C3C3]">
          {buyPercent}% ({buyQty})
        </span>

        <span className="text-[12px] font-light text-[#D1C3C3]">
          ({sellQty}) {sellPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-[10px]">
        <div className="w-full h-[6px] flex rounded-[3px] overflow-hidden">
          {/* Buy */}
          <div
            className="h-full bg-[#0D8C1C]"
            style={{ width: `${buyPercent}%` }}
          />

          {/* Sell */}
          <div
            className="h-full bg-[#B30000]"
            style={{ width: `${sellPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
