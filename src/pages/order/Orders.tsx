import { useEffect, useState } from 'react'
import filterIcon from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import HeaderBar from '../../components/searchHeader/HeaderBar'
import RegularCard from '../../components/regularCard/RegularCard'
import { useAppDispatch, useAppSelector } from '../../store/hook'
// import { useDispatch } from 'react-redux'
import type { RootState } from '../../store/Store'
import { fetchOpenOrders } from '../../store/slices/openOrdersSlice'
import emptyFileIcons from "../../assets/icons/emptyFileIcons.svg"
import EmptyFileComponent from '../../components/emptyFileComponent/EmptyFileComponent'
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

  const dispatch = useAppDispatch()

  const { orders } = useAppSelector(state => state.openOrders)
  const apiStatus = useAppSelector((state: RootState) => state.websockets.apiStatus);
  const instrument = useAppSelector((state) => state.instruments.data)

  console.log(orders)
  console.log(instrument)
  useEffect(() => {
    if (apiStatus === "connected") {
      dispatch(fetchOpenOrders())
    }

  }, [apiStatus, dispatch])


  const findInstrument = (instrumentId: string) => {
    // Flatten all instrument arrays into one for easier searching
    const allInstruments = [
      ...(instrument.stock || [])
    ];
    // Find the matching instrument
    return allInstruments.find((inst: any) => inst.id === instrumentId);
  };


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

      <div className="bg-bgprimary">

        {/* ---------- TABS ---------- */}
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

        {/* ---------- TAB CONTENT ---------- */}
        <div className="w-full max-w-[412px]">
          {activeTab === "regular" && (
            <div className="flex flex-col">

              {orders.length === 0 ? (
                <EmptyFileComponent label={"No instruments available"}/>
              ) : (
                orders.map((order: any) => {
                  const matchedInstrument = findInstrument(order.instrument_id);
                  const symbol = matchedInstrument ? matchedInstrument.feeding_name : (order.trading_name || "ICIC");
                  console.log(symbol)
                  return (<RegularCard
                    key={order.id}
                    symbol={symbol || "ICIC"}
                    fromPrice={order.price.toString()}          //  price
                    toPrice={"--"}                              // optional
                    orderType={`${order.side.toUpperCase()} ${order.order_type}`}
                    quantity={order.placed_qty.toString()}
                    dateTime={new Date(order.placed_time * 1000).toLocaleString()}
                    showSL={true}
                  />)
                })
              )}

            </div>
          )}


          {activeTab === "mcx" && (
            <div className="p-5 text-[12px] text-grayprimary">
              <EmptyFileComponent label={"No Data Availabel"}/>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Orders
