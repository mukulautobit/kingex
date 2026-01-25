import  { useState } from "react";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";
import { useLocation, useNavigate } from "react-router-dom";
import BuySellProgress from "../../components/progressBar/BuySellProgress";
import { calculateBuySellPercent } from "../../Utils/HelperFunction";

/* ------------------ TABS ------------------ */
const tabs = [
  { id: "summary", label: "Summary", width: "w-[80px]" },
  { id: "optionChain", label: "Option Chain", width: "w-[98px]" },
  { id: "news", label: "News", width: "w-[98px]" },
];

interface OptionRow {
  oiChgCall: number;
  callLtp: number;
  strike: number;
  putLtp: number;
  oiChgPut: number;
  callPct: string;
  putPct: string;
}

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

  const navigate = useNavigate();
  const location = useLocation();
  const { instrumentData } = location.state || {};

  /* ---------- SAFE DATA EXTRACTION ---------- */
  const quotes = instrumentData?.dinamic_data?.quotes;

  const bid = quotes?.bid?.[0] ?? 0;
  const ask = quotes?.ask?.[0] ?? 0;
  const bidQty = quotes?.bidq?.[0] ?? 0;
  const askQty = quotes?.askq?.[0] ?? 0;

  const open = quotes?.o?.[0] ?? 0;
  const high = quotes?.h?.[0] ?? 0;
  const low = quotes?.l?.[0] ?? 0;
  const prevClose = quotes?.c?.[0] ?? 0;

  const { buyPercent, sellPercent } =
    calculateBuySellPercent(bid, ask);

  const handleSummaryClick = () => {
    navigate("/InstrumentOrderPlace", {
      state: { instrumentData },
    });
  };

  /* ------------------ TAB CONTENT ------------------ */
  const TabData = [
    {
      id: "summary",
      content: (
        <>
          <div className="w-full max-w-[412px] py-[20px] flex flex-col">

            {/* -------- TOP SUMMARY -------- */}
            <div
              onClick={handleSummaryClick}
              className="pb-[20px] border-b border-[rgba(100,100,100,0.25)] cursor-pointer"
            >
              <div className="flex justify-center gap-[59px] text-center">
                {[
                  { label: "Open", value: open },
                  { label: "High", value: high },
                  { label: "Low", value: low },
                  { label: "Prev. close", value: prevClose },
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

            {/* -------- TABLE HEADER -------- */}
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

            {/* -------- DEPTH ROW -------- */}
            <div className="flex">
              <div className="flex-1 h-[41px] flex items-center justify-center text-white">
                {bidQty}
              </div>

              <div className="flex-1 h-[41px] flex items-center justify-center text-[#00B306]">
                {bid.toFixed(2)}
              </div>

              <div className="flex-1 h-[41px] flex items-center justify-center text-[#B30000]">
                {ask.toFixed(2)}
              </div>

              <div className="flex-1 h-[41px] flex items-center justify-center text-white">
                {askQty}
              </div>
            </div>
          </div>

          {/* -------- BUY / SELL PROGRESS -------- */}
          <BuySellProgress
            buyPercent={buyPercent}
            sellPercent={sellPercent}
            buyQty={bidQty.toString()}
            sellQty={askQty.toString()}
          />
        </>
      ),
    },

    /* -------- OPTION CHAIN (UNCHANGED) -------- */
    {
      id: "optionChain",
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
                  <div className="flex-1 text-center text-[#B30000]">
                    {row.oiChgCall}
                  </div>
                  <div className="flex-1 text-center text-[#B30000]">
                    ₹{row.callLtp}
                  </div>
                  <div className="flex-1 text-center text-[#D9D9D9]">
                    {row.strike}
                  </div>
                  <div className="flex-1 text-center text-[#00B306]">
                    ₹{row.putLtp}
                  </div>
                  <div className="flex-1 text-center text-[#B30000]">
                    {row.oiChgPut}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    /* -------- NEWS (UNCHANGED) -------- */
    {
      id: "news",
      content: (
        <div className="p-2.5">
          <p className="text-xs text-grayprimary">
            Disclaimer : Market data is indicative and subject to change.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-blackprimary">
      <TrendingListHeader
        label={instrumentData?.trading_name ?? "Instrument"}
      />

      {/* -------- TABS -------- */}
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

      {/* -------- TAB CONTENT -------- */}
      <div>
        {TabData.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default InstrumentDetails;
