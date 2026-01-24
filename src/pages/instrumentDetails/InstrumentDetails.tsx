import React, { useState } from "react";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";
import { useLocation, useNavigate } from "react-router-dom";
import BuySellProgress from "../../components/progressBar/BuySellProgress";

/* ------------------ TABS ------------------ */
const tabs = [
  { id: "summary", label: "Summary", width: "w-[80px]" },
  { id: "optionChain", label: "Option Chain", width: "w-[98px]" },
  { id: "news", label: "News", width: "w-[98px]" }
];

/* ------------------ TYPES ------------------ */
interface DepthRow {
  buyQty: number;
  bid: number;
  ask: number;
  sellQty: number;
}

interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface OptionRow {
  oiChgCall: number;
  callLtp: number;
  strike: number;
  putLtp: number;
  oiChgPut: number;
  callPct: string;
  putPct: string;
}

/* ------------------ DATA ------------------ */
const depthData: DepthRow[] = [
  { buyQty: 100, bid: 430.7, ask: 432.0, sellQty: 40 },
  { buyQty: 20, bid: 432.26, ask: 456.23, sellQty: 40 },
  { buyQty: 40, bid: 256.36, ask: 254.23, sellQty: 100 },
  { buyQty: 100, bid: 258.96, ask: 256.89, sellQty: 100 },
  { buyQty: 20, bid: 430.33, ask: 432.2, sellQty: 20 },
  { buyQty: 60, bid: 429.12, ask: 433.1, sellQty: 30 },
];

const optionChainData: OptionRow[] = Array.from({ length: 10 }).map(() => ({
  oiChgCall: 0,
  callLtp: 120,
  strike: 2180,
  putLtp: 8.25,
  oiChgPut: 0,
  callPct: "-28.61%",
  putPct: "-28.61%",
}));

/* ------------------ COMPONENT ------------------ */
const InstrumentDetails = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [showAll, setShowAll] = useState(false);

  const visibleRows = showAll ? depthData : depthData.slice(0, 5);

  const navigate = useNavigate();

  const location = useLocation();
  const { instrumentData } = location.state || {};

  const handleSummayClick = ()=>{
    console.log("click hand;le")
    navigate("/InstrumentOrderPlace", {
      state : {
        instrumentData : instrumentData
      }
    })
  }

  /* ------------------ TAB CONTENT ------------------ */
  const TabData: TabItem[] = [
    {
      id: "summary",
      label: "Summary",
      content: (
        <>
          <div className="w-full max-w-[412px] rounded-t-[20px] py-[20px] flex flex-col">
            {/* Top Summary */}
            <div 
            onClick={handleSummayClick}
            className="pb-[20px] border-b border-[rgba(100,100,100,0.25)]">
              <div className="flex justify-center gap-[59px] text-center">
                {[
                  { label: "Open", value: "199.95" },
                  { label: "High", value: "468.00" },
                  { label: "Low", value: "110.50" },
                  { label: "Prev. close", value: "188.50" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-[12px] font-light text-white">
                      {item.label}
                    </span>
                    <span className="text-[12px] font-normal text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Header */}
            <div className="flex border-b border-[rgba(100,100,100,0.25)]">
              {["Qty.", "Bid", "Ask", "Qty"].map((h) => (
                <div
                  key={h}
                  className="flex-1 h-[38px] flex items-center justify-center text-[12px] text-white"
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Depth Rows */}
            <div className="flex flex-col">
              {visibleRows.map((row, index) => (
                <div key={index} className="flex">
                  <div className="flex-1 h-[41px] flex items-center justify-center text-white">
                    {row.buyQty}
                  </div>
                  <div className="flex-1 h-[41px] flex items-center justify-center text-[#00B306]">
                    {row.bid.toFixed(2)}
                  </div>
                  <div className="flex-1 h-[41px] flex items-center justify-center text-[#B30000]">
                    {row.ask.toFixed(2)}
                  </div>
                  <div className="flex-1 h-[41px] flex items-center justify-center text-white">
                    {row.sellQty}
                  </div>
                </div>
              ))}
            </div>

            {depthData.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-[10px] text-[12px] font-semibold text-white"
              >
                {showAll ? "Show less depth" : "Show 30 depth"}
              </button>
            )}
          </div>

          <BuySellProgress
            buyPercent={21}
            sellPercent={79}
            buyQty="18.35.000"
            sellQty="18.35.000"
          />
        </>
      ),
    },

    {
      id: "optionChain",
      label: "Option Chain",
      content: (
        <div className="w-full max-w-[412px] px-0 py-[16px] flex flex-col gap-[10px]">
          <div className="flex text-[14px] font-medium text-[#D9D9D9]">
            {["OI Chg", "Call LTP", "Strike Price", "Put LTP", "OI Chg"].map(
              (h) => (
                <div key={h} className="flex-1 text-center font-medium">
                  {h}
                </div>
              )
            )}
          </div>

          <div className="flex flex-col">
            {optionChainData.map((row, idx) => (
              <div
                key={idx}
                className="border-b border-[rgba(41,45,61,0.25)] py-[4px]"
              >
                <div className="flex text-[14px]">
                  <div className="flex-1 text-center text-[#B30000] font-medium">
                    {row.oiChgCall}
                  </div>
                  <div className="flex-1 text-center text-[#B30000] font-medium">
                    ₹{row.callLtp}
                  </div>
                  <div className="flex-1 text-center text-[#D9D9D9]">
                    {row.strike}
                  </div>
                  <div className="flex-1 text-center text-[#00B306] font-medium">
                    ₹{row.putLtp}
                  </div>
                  <div className="flex-1 text-center text-[#B30000] font-medium">
                    {row.oiChgPut}
                  </div>
                </div>

                <div className="flex text-[12px] text-[rgba(217,217,217,0.2)]">
                  <div className="flex-1 text-center">0.00%</div>
                  <div className="flex-1 text-center">{row.callPct}</div>
                  <div className="flex-1 text-center text-[10px] text-[rgba(217,217,217,0.5)]">
                    PCR
                  </div>
                  <div className="flex-1 text-center">{row.putPct}</div>
                  <div className="flex-1 text-center">{row.putPct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
        id : 'news',
        label : "News",
        content : (
            <div className="p-2.5 gap-2.5">
                <p className="font-normal text-grayprimary text-xs">Disclaimer : Figma ipsum component variant main layer. Move asset bold stroke underline content comment plugin. Layout export invite overflow hand rectangle mask clip. Connection stroke inspect underline text italic. Opacity draft pen slice draft style flows export. Frame scrolling pen </p>
            </div>
        )
    }
  ];

  return (
    <div className="h-screen">
      <TrendingListHeader label={instrumentData?.name} />

      {/* TABS */}
      <div className="w-full max-w-[412px] h-[44px] px-[20px] flex gap-[10px] border-b border-blacksecondary">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${tab.width} h-11 px-2.5 flex items-center justify-center ${
                isActive ? "border-b-2 border-grayprimary" : ""
              }`}
            >
              <span
                className={`text-xs text-grayprimary ${
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
      <div>{TabData.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default InstrumentDetails;
