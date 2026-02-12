import React, { useState } from "react";
import HeaderBar from "../../components/searchHeader/HeaderBar";
import addMoney from "../../assets/icons/addMoney.svg"

const Wallet = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="relative min-h-screen bg-[#1D1A23]">

      {/* Header */}
      <HeaderBar title="ORDER" />

      {/* -------------------------- WALLET CONTENT -------------------- */}
      <div className="relative w-full max-w-103 mx-auto min-h-screen bg-[#1D1A23] pb-[140px]">

        <div className="flex flex-col px-[20px] pt-[20px] gap-[20px]">

          {/* Balance Card */}
          <div className="w-full bg-mainsecondary border border-brshadeone rounded-[20px]">

            {/* Top Balance Section */}
            <div className="flex flex-col items-center py-5">
              <p className="text-[12px] text-grayprimary">
                Stocks, F&O balance
              </p>

              <h2 className="text-[21px] text-grayprimary leading-8">
                ₹0.00
              </h2>
            </div>

            {/* Divider */}
            <div className="border-t border-blacktertiary" />

            {/* Cash Row */}
            <div className="flex justify-between items-center px-5 py-4">
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

              <button className="text-[14px]  text-grayprimary">
               
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
              <span className="text-[10px] w-24 text-profit flex justify-center items-center font-poppins font-normal ">
                 <img
                src={addMoney}
                className="w-3 h-3"
                />
                Add Money
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* -------------------------- FIXED BOTTOM BUTTONS -------------------- */}
      <div className="fixed bottom-20 left-0 w-full px-5 bg-bgprimary">
        <div className="max-w-103 mx-auto flex gap-2.5 py-2.5">

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
  );
};

export default Wallet;
