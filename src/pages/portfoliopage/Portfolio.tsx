import React, {useState} from 'react'
import HeaderBar from '../../components/searchHeader/HeaderBar'
import filterIcon from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import PositionCard from '../../components/positionCard/PositionCard'
import euflag from "../../assets/icons/euflag.svg"
import usflag from "../../assets/icons/usflag.svg"


export const positionsData = [
  {
    id: 1,
    symbol: "EURUSD",
    profit: "+0.58",
    profitPositive: true,
    type: "Buy 0.01",
    time: "2025.09.15 | 09:05:47",
    flag1: euflag,
    flag2: usflag,
  },
  {
    id: 2,
    symbol: "GBPUSD",
    profit: "-1.24",
    profitPositive: false,
    type: "Sell 0.02",
    time: "2025.09.15 | 09:12:11",
    flag1: euflag,
    flag2: usflag,
  },
];

export const tabs = [
  { id: "positions", label: "Positions", width: "w-[74px]" },
  { id: "holdings", label: "Holdings", width: "w-[71px]" },
];

const Portfolio = () => {

  const [activeTab, setActiveTab] = useState("positions");

  return (
    <div>
      <HeaderBar
        title="Portfolio"
        rightIcons={
          <>
            <img src={filterIcon} className="w-6 h-6" />
            <img src={searchtwo} className="w-6 h-6" />
          </>
        }
      />
      {/* ----------------TABS--------------------- */}
            <div className="h-screen bg-blackprimary">
      
      {/* TABS */}
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

      {/* TAB CONTENT */}
      <div className="w-full max-w-[412px]">
        {activeTab === "positions" && (
          <div className="flex flex-col">
            {positionsData.map((item) => (
              <PositionCard
                key={item.id}
                symbol={item.symbol}
                profit={item.profit}
                profitPositive={item.profitPositive}
                type={item.type}
                time={item.time}
                flag1={item.flag1}
                flag2={item.flag2}
              />
            ))}
          </div>
        )}

        {activeTab === "holdings" && (
          <div className="p-[20px] text-[12px] text-grayprimary">
            No holdings available
          </div>
        )}
      </div>
    </div>

    </div>
  )
}

export default Portfolio
