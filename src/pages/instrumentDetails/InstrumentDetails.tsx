import { useState } from "react";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";
import { useLocation, useNavigate } from "react-router-dom";
import BuySellProgress from "../../components/progressBar/BuySellProgress";
import { calculateBuySellPercent } from "../../Utils/HelperFunction";
import Button from "../../components/button/Button";

/* ------------------ TABS ------------------ */
const tabs = [
  { id: "summary", label: "Summary", width: "w-[80px]" },
  { id: "optionChain", label: "Option Chain", width: "w-[98px]" },
  { id: "news", label: "News", width: "w-[98px]" },
  { id: "fundamentals", label: "Fundamentals", width: "w-[98px]" },
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
    // navigate("/InstrumentOrderPlace", {
    //   state: { instrumentData },
    // });
    console.log("handle click")
  };

  /* ------------------ TAB CONTENT ------------------ */
  const TabData = [
    {
      id: "summary",
      content: (
        <>
      <div className="w-full max-w-[412px] mx-auto flex flex-col bg-[#0F0F1A] rounded-t-[20px]">

        {/* ================= TOP OHLC ================= */}
        <div className="py-5 border-b border-[rgba(100,100,100,0.25)]">
          <div className="flex justify-center gap-[59px] text-center">
            {[
              { label: "Open", value: "199.5" },
              { label: "High", value: "199.5" },
              { label: "Low", value: "199.5" },
              { label: "Prev. close", value: "199.5" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
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

        {/* ================= CIRCUIT SECTION ================= */}
        <div className="px-5 py-4 border-b border-[rgba(100,100,100,0.25)] flex gap-5">

          {/* LEFT CIRCUIT */}
          <div className="flex-1">
            <p className="text-[12px] text-[#D1C3C3]">
              Circuit (Lower-Upper)
            </p>

            <div className="mt-2">
              <div className="flex h-[6px] rounded overflow-hidden">
                <div className="w-[60%] bg-main" />
                <div className="flex-1 bg-main/50" />
              </div>

              <div className="flex justify-between text-[10px] text-[#D1C3C3] mt-1">
                <span>8.96</span>
                <span>10.94</span>
              </div>
            </div>
          </div>

          {/* RIGHT CIRCUIT */}
          <div className="flex-1 text-right">
            <p className="text-[12px] text-[#D1C3C3]">
              Circuit (Lower-Upper)
            </p>

            <div className="mt-2">
              <div className="flex h-[6px] rounded overflow-hidden">
                <div className="w-[60%] bg-[#5B298C]" />
                <div className="flex-1 bg-[#5B298C]/50" />
              </div>

              <div className="flex justify-between text-[10px] text-[#D1C3C3] mt-1">
                <span>6.12</span>
                <span>12.80</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DEPTH HEADER ================= */}
        <div className="flex px-5 py-2 border-b border-[rgba(100,100,100,0.25)] text-[12px] text-white">
          <div className="flex-1 text-center">Quantity</div>
          <div className="flex-1 text-center">Bid</div>
          <div className="flex-1 text-center">Ask</div>
          <div className="flex-1 text-center">Qty</div>
        </div>

        {/* ================= DEPTH ROWS ================= */}
        {Array.from({ length: 5 }).map((_, i) => {
          const highlightBuy = i === 1;
          const highlightSell = i === 3;

          return (
            <div key={i} className="flex px-5 py-2 gap-5">

              {/* BUY SIDE */}
              <div className="flex-1">
                <div
                  className={`flex justify-between rounded px-2 py-1 ${
                    highlightBuy ? "bg-[#33BF9020]" : ""
                  }`}
                >
                  <span className="text-[#33BF90] text-[14px]">
                    {bidQty}
                  </span>
                  <span className="text-[#33BF90] text-[14px]">
                    {bid.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* SELL SIDE */}
              <div className="flex-1">
                <div
                  className={`flex justify-between rounded px-2 py-1 ${
                    highlightSell ? "bg-[#BF333320]" : ""
                  }`}
                >
                  <span className="text-[#BF3333] text-[14px]">
                    {ask.toFixed(2)}
                  </span>
                  <span className="text-[#BF3333] text-[14px]">
                    {askQty}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* ================= SHOW DEPTH ================= */}
        <div className="py-2 text-center text-[12px] font-semibold text-white">
          Show 30 depth
        </div>
      </div>

      {/* ================= BUY SELL PROGRESS ================= */}
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
              (h,i) => (
                <div key={i} className="flex-1 text-center font-medium">
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
                  <div className="flex-1 text-center text-grayprimary">
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
    <div className="min-h-screen bg-blackprimary pb-20"> {/* Added pb-20 to prevent overlap with fixed buttons */}
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
              className={`${tab.width} h-11 px-2.5 flex items-center justify-center ${isActive ? "border-b-2 border-grayprimary" : ""
                }`}
            >
              <span
                className={`text-xs text-grayprimary ${isActive ? "font-medium" : "font-light"
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

      {/* -------- BUY/SELL BUTTONS (Only for Summary Tab) -------- */}
      {activeTab === "summary" && (
        <div className="fixed bottom-0 left-0 right-0 bg-blackprimary px-4 py-3 border-t border-[rgba(100,100,100,0.25)] z-50">
          <div className="flex gap-4 max-w-[412px] mx-auto"> {/* Added max-w and mx-auto for centering on wider screens */}
            <Button
              label="Buy"
              variant="buy"
              className="flex-1"
              onClick={() =>
                navigate("/InstrumentOrderPlace", {
                  state: { instrumentData,  side:"buy" },
                })
              }
            />

            <Button
              label="Sell"
              variant="sell"
              className="flex-1"
              onClick={() =>
                navigate("/InstrumentOrderPlace", {
                  state: { instrumentData , side:"sell" },
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentDetails;