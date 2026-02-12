import { useEffect, useState } from 'react'
import HeaderBar from '../../components/searchHeader/HeaderBar'
import filterIcon from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import PositionCard from '../../components/positionCard/PositionCard'
import euflag from "../../assets/icons/euflag.svg"
import usflag from "../../assets/icons/usflag.svg"
import { useAppDispatch, useAppSelector } from '../../store/hook'
import type { RootState } from "../../store/Store"
import { fetchInstrumentsByCategory } from "../../store/slices/instrumentsSlice"
import PortfolioSummaryCard from '../../components/portfolioSummaryCard/PortfolioSummaryCard'
import googleIcon from "../../assets/icons/googleIcon.svg"
import emptyFileIcons from "../../assets/icons/emptyFileIcons.svg"
// import { calculatePnL } from "../../Utils/HelperFunction"

export const tabs = [
  { id: "positions", label: "Positions", width: "w-[74px]" },
  { id: "holdings", label: "Holdings", width: "w-[71px]" },
];

const Portfolio = () => {

  const [activeTab, setActiveTab] = useState("positions");
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<"all" | "pledge">("all");

  // websocket api status

  const apiStatus = useAppSelector(
    (state: RootState) => state.websockets.apiStatus
  );

  // instruments slice
  const { data } = useAppSelector(
    (state: RootState) => state.instruments
  );

  // open positions
  // const positions = useAppSelector(
  //   (state: RootState) => state.positions.positions || []
  // );

  // console.lo
  // stock instruments
  const instruments = data?.stock || [];

  // console.log(instruments)

  useEffect(() => {
    dispatch(fetchInstrumentsByCategory("stock"));
  }, [apiStatus, dispatch]);

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
      <div className="h-screen bg-blacktertiary">

        {/* TABS */}
        <div className="w-full max-w-103 h-11 px-5 flex gap-2.5 border-b border-blacksecondary">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${tab.width} h-11 px-2.5 flex items-center justify-center ${isActive ? "border-b-2 border-[#D9D9D9]" : ""
                  }`}
              >
                <span
                  className={`text-[12px] text-grayprimary ${isActive ? "font-medium" : "font-light"
                    }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        <div className="w-full max-w-103">

          {activeTab === "positions" && (
            <div className="flex flex-col">
              <PortfolioSummaryCard
                totalValue={811}
                overallPnL={-21.05}
                investedValue={860}
                todaysGain={21.05}
                todaysGainPercent={2.66}
                stockName="GOOGLE"
                quantity={5}
                atp={19.65}
                stockPnL={52.89}
                stockPnLPercent={0.53}
                ltp={9.07}
                ltpPercent={1.23}
              />

              {instruments.length === 0 ? (
                <div className="p-5 text-[12px] text-grayprimary flex flex-col justify-center items-center">
                  <img
                  src={emptyFileIcons}
                  className='w-25 h-25'
                  />
                  No instruments available
                </div>
              ) : (
                instruments.map((item: any) => (
                  <PositionCard
                    key={item.id}
                    symbol={item?.feeding_name}
                    profit={item.dinamic_data?.quotes?.ltp?.[0]?.toString()}
                    profitPositive={true}
                    type="Market"
                    time={new Date(
                      item?.dinamic_data?.quotes?.ltpt?.[0]
                    ).toLocaleString()}
                    flag1={euflag}
                    flag2={usflag}
                  />
                ))
              )}

            </div>
          )}


          {activeTab === "holdings" && (
            <div className="flex flex-col">

              {/* ===== All / Pledge Tabs ===== */}
              <div className="h-12.25 bg-blacktertiary px-5 flex items-center gap-3">

                <button
                  onClick={() => setActive("all")}
                  className={`h-6.5 px-3 rounded-md text-[12px] flex items-center justify-center
          ${active === "all"
                      ? "bg-main/20 border border-main text-grayprimary"
                      : "border border-grayprimary text-grayprimary opacity-20"
                    }`}
                >
                  All
                </button>

                <button
                  onClick={() => setActive("pledge")}
                  className={`h-6.5 px-3 rounded-md text-[12px] flex items-center justify-center
                    ${active === "pledge"
                      ? "bg-main/20 border border-main text-grayprimary"
                      : "border border-grayprimary text-grayprimary opacity-20"
                    }`}
                >
                  Pledge
                </button>
              </div>

              {/* ===== Stock Row ===== */}
              <div className="px-5">

                <div className="flex items-center gap-5 py-2.5 border-b border-brshadeone">

                  {/* ICON */}
                  <img
                    src={googleIcon}
                    alt="Google"
                    className="w-10.25 h-10.25 rounded-[9px] object-cover"
                  />

                  {/* LEFT SIDE */}
                  <div className="flex flex-col">
                    <p className="text-[14px] text-grayprimary">
                      GOOGLE
                    </p>
                    <p className="text-[12px] text-grayprimary font-light">
                      5 x ATP ₹19.65
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="ml-auto flex flex-col items-end">
                    <p className="text-[14px] font-medium text-greenshadeone">
                      -₹52.89 (0.53%)
                    </p>

                    <p className="text-[12px] text-grayprimary font-light">
                      LTP ₹9.07 (+1.23%)
                    </p>
                  </div>

                </div>


              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

export default Portfolio;
