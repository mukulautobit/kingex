interface CommodityRowProps {
  tradeName: string;
  exchange: string;
  ltp: number;
  change: number;
  changePercent: number;
  isFav?: boolean;
  onFavClick?: () => void;
}

const CommodityRow = ({
  tradeName,
  exchange,
  ltp,
  change,
  changePercent,
  isFav = false,
  onFavClick,
}: CommodityRowProps) => {
  const isPositive = change >= 0;

  return (
    <div className="flex items-center justify-between w-[372px] h-[39px] gap-[10px]">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center">
        <p className="text-[14px] font-normal text-grayprimary leading-[21px]">
          {tradeName}
        </p>
        <p className="text-[12px] font-light text-grayprimary] leading-[18px]">
          {exchange}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        
        <div className="flex flex-col items-end">
          <p
            className={`text-[14px] font-medium leading-5.25 ${
              isPositive ? "text-greenshadeonee" : "text-red-400"
            }`}
          >
            {ltp.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p className="text-[12px] font-light text-grayprimary leading-4.5">
            {isPositive ? "+" : ""}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>
        </div>

        {/* FAV ICON */}
        <button
          onClick={onFavClick}
          className="w-6 h-6 flex items-center justify-center border border-grayprimary rounded-full"
        >
          {isFav && <div className="w-3 h-3 bg-profit d-full" />}
        </button>
      </div>
    </div>
  );
};

export default CommodityRow;
