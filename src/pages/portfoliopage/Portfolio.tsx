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
// import { calculatePnL } from "../../Utils/HelperFunction"

export const tabs = [
  { id: "positions", label: "Positions", width: "w-[74px]" },
  { id: "holdings", label: "Holdings", width: "w-[71px]" },
];

const Portfolio = () => {

  const [activeTab, setActiveTab] = useState("positions");
  const dispatch = useAppDispatch();

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

  console.log(instruments)

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
      <div className="h-screen bg-blackprimary">

        {/* TABS */}
        <div className="w-full max-w-[412px] h-[44px] px-[20px] flex gap-[10px] border-b border-[#181818]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${tab.width} h-[44px] px-[10px] flex items-center justify-center ${isActive ? "border-b-2 border-[#D9D9D9]" : ""
                  }`}
              >
                <span
                  className={`text-[12px] text-[#D9D9D9] ${isActive ? "font-medium" : "font-light"
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
              {instruments.length === 0 ? (
                <div className="p-[20px] text-[12px] text-grayprimary">
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
            <div className="p-[20px] text-[12px] text-grayprimary">
              No holdings available
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Portfolio;
