import React, { useState } from 'react'
import filterIcon from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import HeaderBar from '../../components/searchHeader/HeaderBar'
import RegularCard from '../../components/regularCard/RegularCard'
// import PositionCard from '../../components/positionCard/PositionCard'

type TabId = "regular" | "mcx";

export const tabs: { id: TabId; label: string; width: string }[] = [
  { id: "regular", label: "Regular", width: "w-[70px]" },
  { id: "mcx", label: "MCX", width: "w-[52px]" },
];

export const regularOrders = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  symbol: "EURUSD",
  fromPrice: "0.0670",
  toPrice: "0.0690",
  orderType: "Buy limit",
  quantity: "0.01",
  dateTime: "03/11/2025 15:39",
  showSL: true,
}));

const Orders = () => {
   const [activeTab, setActiveTab] = useState<TabId>("regular");
  return (
    <div>
       <HeaderBar
        title="ORDER"
        rightIcons={
          <>
            <img src={filterIcon} className="w-6 h-6" />
            <img src={searchtwo} className="w-6 h-6" />
          </>
        }
      />
    {/* ------------------------TABS------------------------------ */}

     <div className="bg-blackprimary">

      {/* ---------- TABS ---------- */}
      <div className="w-full max-w-[412px] h-[44px] px-[20px] flex gap-[10px] border-b border-[#181818]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${tab.width} h-[44px] px-[10px] flex items-center justify-center ${
                isActive ? "border-b-2 border-[#D9D9D9]" : ""
              }`}
            >
              <span
                className={`text-[12px] text-[#D9D9D9] ${
                  isActive ? "font-medium" : "font-light"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- TAB CONTENT ---------- */}
      <div className="w-full max-w-[412px]">
        {activeTab === "regular" && (
          <div className="flex flex-col">
            {regularOrders.map((order) => (
              <RegularCard
                key={order.id}
                symbol={order.symbol}
                fromPrice={order.fromPrice}
                toPrice={order.toPrice}
                orderType={order.orderType}
                quantity={order.quantity}
                dateTime={order.dateTime}
                showSL={order.showSL}
              />
            ))}
          </div>
        )}

        {activeTab === "mcx" && (
          <div className="p-[20px] text-[12px] text-grayprimary">
            No data available
          </div>
        )}
      </div>
    </div>
      
    </div>
  )
}

export default Orders
