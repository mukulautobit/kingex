import  { useEffect, useState } from 'react'
import CommoditiesHeader, { type CommoditiesHeaderProps } from '../commoditiesheader/CommoditiesHeader'
// import CommoditiesItem from '../commoditiesItem/CommoditiesItem'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hook'
// import { fetchPositions } from '../../store/slices/positionsSlice'
// import {calculatePnL, formatEpochToTime} from "../../Utils/HelperFunction"
import type { RootState } from '../../store/Store'
import { fetchInstrumentsByCategory, setSelectedInstrument } from '../../store/slices/instrumentsSlice'
import Card from '../card/Card'
import { subscribeToInstruments } from '../../service/socketService'




const Commodities = ({icon, label = "stock"}:CommoditiesHeaderProps) => {

  const dispatch = useAppDispatch();
  const [subscribedIds, setSubscribedIds] = useState<string[]>([]);
  const apiStatus = useAppSelector(state=> state.websockets.apiStatus)
  const {data, error, status} = useAppSelector(state=> state.instruments)
  // const {positions} = useAppSelector(state=> state.positions)
  const stremStatus = useAppSelector((state:RootState)=> state.websockets.streamStatus)


    const instruments = data[label.toLowerCase()] || [];

  let filteredInstruments = [...instruments];

  

  const navigate = useNavigate();

  console.log(data, error, status)

  // useEffect(()=>{
  //   console.log(positions)
  // },[positions])
    


  useEffect(()=>{
      // dispatch action for  get instrument
      dispatch(fetchInstrumentsByCategory(label.toLowerCase()))

  },[apiStatus, dispatch])


useEffect(() => {
  if (!instruments.length) return;
  if (stremStatus !== "connected") {
    console.log("⏳ Stream not connected yet, waiting...");
    return;
  }

  console.log("✅ Stream connected, subscribing to instruments");
  
  // Filter IDs that aren't already subscribed
  const idsToSubscribe = instruments
    .map((i) => i.id)
    .filter((id) => !subscribedIds.includes(id));

  if (idsToSubscribe.length === 0) return;

  console.log(" Auto subscribing IDs:", idsToSubscribe);

  subscribeToInstruments(idsToSubscribe);
  setSubscribedIds((prev) => [...prev, ...idsToSubscribe]);
}, [instruments, stremStatus]);




   const handleCardClick = (data:any)=>{
        // const data = {
        //     value : "970272",
        //     name : "abcd"
        // }
    dispatch(setSelectedInstrument(data.id));
        navigate("/instrumentDetails", {
            state : {
                instrumentData : data
            }
        })
    }
  return (
   <div
      className="
        w-full
        px-[20px] pt-[10px] pb-[20px] h-full
        border-t border-blacksecondary
        flex flex-col gap-[10px] overflow-hidden
      "
    >
     <CommoditiesHeader icon={icon} label={label}/>

       {/* ---------- ITEMS ---------- */}

      {
        filteredInstruments.map((instrument) => (
            <Card
              key={instrument.id}
              code={instrument.name}
              bid={instrument.dinamic_data.quotes.bid?.[0] ?? 0}
              ask={instrument.dinamic_data.quotes.ask[0] ?? 0}
              ltp={instrument.dinamic_data.quotes.ltp[0] ?? 0}
              high={instrument.dinamic_data.quotes.h[0] ?? 0}
              low={instrument.dinamic_data.quotes.l[0] ?? 0}
              close={instrument.dinamic_data.quotes.c[0] ?? 0}
              pip={instrument.static_data.ticksize}
              timestamp={instrument.overnight_margin_time}
              cardIcon={instrument.icon}
              onClick={() => handleCardClick(instrument)}
              active="forex"
              favourites={true}
            />
          ))
      }

     {/*  */}

    </div>
  )
}

export default Commodities;


// <div className="flex flex-col">
//         {positions.map((pos) => {
//         const pnl = calculatePnL({
//          side: pos.side,              // "buy" | "sell"
//          entryPrice: pos.price,  // number
//          bid: pos.live_bid,                // current bid
//          ask: pos.live_ask,                // current ask
//          quantity: pos.qty,
//     });

//     return (
//       <div
//         key={pos.id}
//         onClick={() => handleCardClick(pos)}
//       >
//         <CommoditiesItem
//           tradeName={pos.trading_name}
//           exchange={"NSE"}
//           ltp={pos.price}
//           pnl={pnl}                 // ✅ FINAL VALUE PASSED
//           timestamp={pos.created_at}
//         />
//       </div>
//     );
//   })}
// </div>