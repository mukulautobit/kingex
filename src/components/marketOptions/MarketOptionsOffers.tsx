// import React from 'react'
// import stocksIcon from "../../assets/icons/trendingStocks.svg"
import cash from "../../assets/icons/cash.svg"
import fno from "../../assets/icons/fno.svg"
import stock from "../../assets/icons/stock.svg"
import mcx from "../../assets/icons/mcx.svg"

const MarketOptionsOffers = () => {
 return (
    <div
      className="
        flex items-start
        h-[123px]
        px-[20px] py-[10px]
        w-full
      "
    >
      {/* Container */}
      <div
        className="
          flex flex-wrap justify-between items-center content-start
          gap-[20px]
          w-full h-[103px]
          px-[10px] py-[20px]
          rounded-[10px]
        "
      >
        {/* Cash */}
        <div className="flex flex-col items-center gap-[12px] w-[51px] h-[63px]">
          <img src={cash} className="w-[33px] h-[33px] " />
          <span
            className="
              font-poppins font-[275]
              text-[12px] leading-[18px]
              text-center
              text-grayprimary
            "
          >
            Cash
          </span>
        </div>

        {/* F&O */}
        <div className="flex flex-col items-center gap-[12px] w-[51px] h-[63px]">
          <img src={fno} className="w-[33px] h-[33px] " />
          <span
            className="
              font-poppins font-[275]
              text-[12px] leading-[18px]
              text-center
              text-grayprimary
            "
          >
            F&amp;O
          </span>
        </div>

        {/* Stocks */}
        <div className="flex flex-col items-center gap-[12px] w-[51px] h-[63px]">
          <img src={stock} className="w-[33px] h-[33px] " />
          <span
            className="
              font-poppins font-[275]
              text-[12px] leading-[18px]
              text-center
              text-grayprimary
            "
          >
            Stocks
          </span>
        </div>

        {/* MCX */}
        <div className="flex flex-col items-center gap-[12px] w-[51px] h-[63px]">
          <img src={mcx} className="w-[33px] h-[33px] " />
          <span
            className="
              font-poppins font-[275]
              text-[12px] leading-[18px]
              text-center
              text-grayprimary
            "
          >
            MCX
          </span>
        </div>
      </div>
    </div>
  );
}

export default MarketOptionsOffers
