import  { useEffect } from "react";
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

const MyList = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            <img src={filterIcon} className="w-6 h-6" />
            <img src={plusIcon} className="w-6 h-6" />
          </>
        }
      />

      <InfoHeader />

      {/* LIST */}
      <div className="flex flex-col">

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

    </div>
  );
};

export default MyList;
