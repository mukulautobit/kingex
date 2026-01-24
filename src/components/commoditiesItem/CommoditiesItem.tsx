import React from 'react'
interface CommodityRowProps {
  priceColor: string;
}
const CommoditiesItem = ({ priceColor }: CommodityRowProps) => {
  return (
    <div
      className="
        flex items-center justify-between
        py-[10px]
        border-b border-[#181818]
      "
    >
      {/* Left Info */}
      <div className="flex flex-col gap-[2px]">
        <span
          className="
            font-poppins font-medium
            text-[13px] leading-[18px]
            text-white
          "
        >
          CRUDEOIL FUT
        </span>

        <span
          className="
            font-poppins font-light
            text-[11px] leading-[16px]
            text-[#8E8E8E]
          "
        >
          MCX 19 FEB 26
        </span>
      </div>

      {/* Right Price */}
      <div className="flex flex-col items-end gap-[2px]">
        <span
          className={`
            font-poppins font-medium
            text-[14px] leading-[21px]
            ${priceColor}
          `}
        >
          25,289.30
        </span>

        <span
          className="
            font-poppins font-light
            text-[11px] leading-[16px]
            text-[#8E8E8E]
          "
        >
          +132.40 (0.53%)
        </span>
      </div>
    </div>
  );
}

export default CommoditiesItem
