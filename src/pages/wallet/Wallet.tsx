import React, { useState } from 'react'
import HeaderBar from '../../components/searchHeader/HeaderBar';
// import searchIcon from "../../assets/icons/searchIcon.svg"

const Wallet = () => {
    const [search, setSearch] = useState<string>("");
  return (
    <div>
       <HeaderBar  
        title="ORDER"
        // rightIcons={<img src={searchIcon} className="w-[15px] h-[15px]" />}
        // placeholder="Search"
        // onSearchChange={(value) => setSearch(value)}
      />
      
      {/* --------------------------WALLET-------------------- */}
      <div className="relative w-full max-w-103 mx-auto min-h-screen bg-[#1D1A23] pb-[120px]">

      {/* Main Container */}
      <div className="flex flex-col justify-between px-[20px] pt-[20px] gap-[20px]">

        {/* Balance Card */}
        <div className="w-full bg-mainsecondary border border-brshadeone rounded-[20px]">

          {/* Top Balance Section */}
          <div className="flex flex-col items-center py-[20px]">
            <p className="text-[12px] text-grayprimary">
              Stocks, F&O balance
            </p>

            <h2 className="text-[21px] text-grayprimary leading-[32px]">
              ₹0.00
            </h2>
          </div>

          {/* Divider */}
          <div className="border-t border-[#1D1A23]" />

          {/* Cash Row */}
          <div className="flex justify-between items-center px-[20px] py-[16px]">
            <span className="text-[12px] text-grayprimary">
              Cash
            </span>

            <span className="text-[17px] text-grayprimary">
              ₹0.00
            </span>
          </div>

          {/* Pledge Row */}
          <div className="flex justify-between items-center px-[20px] py-[16px]">

            <div className="flex flex-col gap-[4px] max-w-[70%]">
              <span className="text-[12px] text-grayprimary">
                Pledge
              </span>

              <p className="text-[10px] leading-[15px] text-grayprimary/50">
                Add balance for stock intraday and F&O by pledging your holding on Kingex
              </p>
            </div>

            <button className="text-[14px] text-grayprimary">
              Add
            </button>
          </div>
        </div>

        {/* Add Money Button */}
        <div className="flex justify-center">
          <button
            className="
              flex items-center gap-1.5
              px-4 py-2
              bg-[rgba(0,179,6,0.2)]
              border border-[rgba(0,179,6,0.5)]
              rounded-lg
            "
          >
            <span className="text-[10px] text-[#00B306]">
              Add Money
            </span>
          </button>
        </div>

        {/* Withdraw / Deposit Buttons */}
        <div className="flex gap-[10px] mt-[20px]">

          {/* Withdraw */}
          <button
            className="
              flex-1
              h-[46px]
              bg-[rgba(91,41,140,0.2)]
              border border-main
              rounded-[10px]
              text-main
              text-[14px]
              font-medium
            "
          >
            Withdraw
          </button>

          {/* Deposit */}
          <button
            className="
              flex-1
              h-[46px]
              bg-main
              rounded-[10px]
              text-grayprimary
              text-[14px]
              font-medium
            "
          >
            Deposit
          </button>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Wallet
