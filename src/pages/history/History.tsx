import  { useEffect, useState } from 'react'
import HeaderBar from '../../components/searchHeader/HeaderBar'
import filterIcon from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import HistoryRegularCard from '../../components/historyRegularCard/HistoryRegularCard';
import { fetchHistory } from '../../service/api';

type TabId = "regular" | "mcx";

export const tabs: { id: TabId; label: string; width: string }[] = [
  { id: "regular", label: "Regular", width: "w-[70px]" },
  { id: "mcx", label: "MCX", width: "w-[52px]" },
];


export const historyRegularData = [
  {
    id: 1,
    symbol: "EURUSD",
    dateTime: "2025.09.15 | 09:05:47",
    qtyValue: "11.00 at market",
    status: "FILLED",
  },
  {
    id: 2,
    symbol: "GBPUSD",
    dateTime: "2025.09.15 | 09:12:10",
    qtyValue: "5.00 at market",
    status: "FILLED",
  },
];

const History = () => {

  const [activeTab, setActiveTab] = useState<TabId>("regular");

  const [history , setHistory] = useState();

  const getData = async()=>{

    const res = await fetchHistory()

    console.log(res)
    setHistory(res)

  }
  console.log(history)

  useEffect(()=>{
    console.log("HISTORY")
    getData()
  },[])

  return (
    <div>
       <HeaderBar
        title="History"
        rightIcons={
          <>
            <img src={filterIcon} className="w-6 h-6" />
            <img src={searchtwo} className="w-6 h-6" />
          </>
        }
      />

      {/* ------------------TABS------------------------------ */}
      <div className="bg-blackprimary h-screen">

      {/* ---------- TABS ---------- */}
      <div className="w-full md:max-w-[412px] h-[44px] px-[20px] flex gap-[10px] border-b border-[#181818]">
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
      <div className="w-full md:max-w-[412px]">
        {activeTab === "regular" && (
          <div className="flex flex-col">
            {historyRegularData.map((item) => (
              <HistoryRegularCard
                key={item.id}
                symbol={item.symbol}
                dateTime={item.dateTime}
                qtyValue={item.qtyValue}
                status={item.status}
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

export default History
