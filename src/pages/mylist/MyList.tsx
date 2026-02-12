import { useEffect, useState } from "react";
import HeaderBar from "../../components/searchHeader/HeaderBar";
import filterIcon from "../../assets/icons/lineFilter.svg";
import plusIcon from "../../assets/icons/plusIcon.svg";
import InfoHeader from "../../components/infoheader/InfoHeader";
import { useNavigate } from "react-router-dom";
import CommoditiesItem from "../../components/commoditiesItem/CommoditiesItem";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import type { RootState } from "../../store/Store";
import { fetchInstrumentsByCategory } from "../../store/slices/instrumentsSlice";
import { calculatePnL } from "../../Utils/HelperFunction";
import { motion, AnimatePresence } from "framer-motion";
import "./MyList.css"

const MyList = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  // websocket api status
  const apiStatus = useAppSelector(
    (state: RootState) => state.websockets.apiStatus
  );

  // instruments slice
  const { data } = useAppSelector(
    (state: RootState) => state.instruments
  );

  // open positions
  const positions = useAppSelector(
    (state: RootState) => state.positions.positions || []
  );

  // stock instruments
  const instruments = data?.stock || [];

  useEffect(() => {
    dispatch(fetchInstrumentsByCategory("stock"));
  }, [apiStatus, dispatch]);

  const handleCardClick = (item: any) => {
    navigate("/instrumentDetails", {
      state: {
        instrumentData: item,
      },
    });
  };

  return (
    <div>

      {/* HEADER */}
      <HeaderBar
        title="Top 20 by Market Cap"
        rightIcons={
          <>
            <img src={filterIcon} onClick={(e) => {
              e.stopPropagation();
              setOpenDrawer(prev => !prev)
            }} className="w-6 h-6" />
            <img src={plusIcon} className="w-6 h-6" />

          </>
        }
      // onOpenDrawer={() => setOpenDrawer(prev => !prev)}
      />

      <InfoHeader />

      {/* LIST */}
      <div className="flex flex-col px-5 py-2.5">

        {instruments.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No stocks available
          </p>
        ) : (

          instruments.map((item: any) => {

            // find position for this instrument
            const position = positions.find(
              (p: any) => p.instrument_id === item.id
            );

            let pnl = 0;

            if (position) {
              pnl = calculatePnL({
                side: position.side,                              // buy/sell
                entryPrice: position.price,                      // entry
                bid: item?.dinamic_data?.quotes?.bid?.[0],       // live bid
                ask: item?.dinamic_data?.quotes?.ask?.[0],       // live ask
                quantity: position.qty
              });
            }

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
              >
                <CommoditiesItem
                  tradeName={item.name}
                  exchange="NSE"
                  ltp={item?.dinamic_data?.quotes?.ltp?.[0]}
                  pnl={Number(pnl.toFixed(2))}
                  timestamp={item?.dinamic_data?.quotes?.ltpt?.[0]}
                />
              </div>
            );
          })
        )}

      </div>
      {/* ================= BOTTOM DRAWER ================= */}
      <AnimatePresence>
        {openDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenDrawer(false)}
            />

            {/* Drawer */}
            <motion.div
              className="
               fixed bottom-0 left-0 right-0
               bg-mainsecondary
               rounded-t-2xl
               p-5
              z-10001
              "
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                event.stopPropagation()
                if (info.offset.y > 150) {
                  setOpenDrawer(false);
                }
              }}
            >
              {/* Drag Indicator */}
              <div className="w-12 h-1 bg-gray-500 rounded-full mx-auto mb-4" />

              <p className="text-[12px] text-grayprimary mb-4">
                Sort current Watchlist
              </p>

              {[
                "Percentage (%)",
                "Price (₹)",
                "Alphabetically",
                "Custom",
              ].map((label, index) => (
                <div key={index} className="flex items-center justify-between mb-3">

                  <span className="text-[12px] text-grayprimary w-37.5">
                    {label}
                  </span>

                  <div className="flex gap-3">

                    <button className="h-7.5 w-[6.313rem] px-4 border border-grayprimary rounded-md text-[12px] text-[#D9D9D9]">
                      {label === "Alphabetically"
                        ? "A → Z"
                        : label === "Custom"
                          ? "Edit list"
                          : "High → Low"}
                    </button>

                    <button className="h-[30px] w-[6.313rem] px-4 border border-[#D9D9D9] rounded-[6px] text-[12px] text-[#D9D9D9]">
                      {label === "Alphabetically"
                        ? "Z → A"
                        : label === "Custom"
                          ? "Applied"
                          : "Low → High"}
                    </button>

                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </div>
  );
};

export default MyList;
