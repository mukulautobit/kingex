import { useEffect, useState } from "react";
import { usePrevious } from "../../Utils/HelperFunction";
// import notFavouriteTickLight from "../../assets/icons/notFavrouiteTickLight.svg";
// import favouriteTickLight from "../../assets/icons/favrouiteTickLight.svg";
// import notFavouriteTick from "../../assets/icons/notFavrouiteTick.svg";
// import favouriteTick from "../../assets/icons/favrouiteTick.svg";
// import { useAppSelector } from "../../store/hook";
// import type { OutletContextType } from "../../layout/MainLayout";
// import { useOutletContext } from "react-router-dom";
import flagIcon from "../../assets/icons/flagslogo.svg"

export interface CardProps {
  code: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  ltp: number;
  close: number;
  pip?: number | string;
  timestamp: string;
  cardIcon?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: string;
  favourites?: boolean;
}

const Card = ({
  code,
  bid,
  ask,
  high,
  low,
  ltp,
  close,
  // pip,
  timestamp,
  // cardIcon,
  onClick,
  // active,
  // favourites,
}: CardProps) => {
  // const askPrice = formatPrice(ask, pip);
  // const bidPrice = formatPrice(bid, pip);


  // console.log(askPrice, bidPrice)
  // 🌈 Dynamic colors
  const [askColor, setAskColor] = useState("text-white");
  const [bidColor, setBidColor] = useState("text-white");

//   const [favouriteInstrument, setFavouriteInstrument] = useState<string[]>([]);
//   useOutletContext<OutletContextType>();
//   const [star, setStar] = useState<boolean>(false);

//   const theme = useAppSelector((state) => state.theme.mode);

  // Previous prices
  const prevAsk = usePrevious(ask);
  const prevBid = usePrevious(bid);

  //  ASK COLOR LOGIC (FIXED)
  useEffect(() => {
    if (prevAsk == null) return;

    if (ask > prevAsk) {
      setAskColor("text-[#00B306]");
    } else if (ask < prevAsk) {
      setAskColor("text-[#B30000]");
    }
    // if equal → keep previous color
  }, [ask, prevAsk]);

  // console.log(active)
  //  BID COLOR LOGIC (FIXED)
  useEffect(() => {
    if (prevBid == null) return;

    if (bid > prevBid) {
      setBidColor("text-[#00B306]");
    } else if (bid < prevBid) {
      setBidColor("text-[#B30000]");
    }
    // if equal → keep previous color
  }, [bid, prevBid]);

  // Change & %
  const change = ltp - close;
  const percentageChange = close !== 0 ? (change / close) * 100 : 0;
  const changeColor = change >= 0 ? "text-[#00B306]" : "text-[#B30000]";
  const changeSign = change >= 0 ? "+" : "";

//   const iconSrc =
//     theme === "light"
//       ? star
//         ? favouriteTickLight
//         : notFavouriteTickLight
//       : star
//         ? favouriteTick
//         : notFavouriteTick;

  return (
    <div
      className={`bg-blackprimary border-blacksecondary 
        px-5 py-2.5 border-b`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <img src={flagIcon} alt="cardIcon" className="w-[33px] h-[29px]" />

          <div>
            <div className="flex justify-between items-center text-white text-[10px]">
              <span>{timestamp}</span>
            </div>

            <h2 className="my-1 text-grayprimary">{code.toUpperCase()}</h2>

            <p className={`text-[10px] ${changeColor}`}>
              {changeSign}
              {change.toFixed(2)}{" "}
              <span>({percentageChange.toFixed(3)}%)</span>
            </p>
          </div>
        </div>

        {/* Prices */}
        <div className="flex items-center mt-2">
          {/* BID */}
          <div className="text-right pr-2">
            {/* {bidPrice.isPipFormatted ? (
              <p
                className={`${bidColor} leading-5 transition-colors duration-200 flex items-baseline`}
              >
                <span className="text-sm">{bidPrice.main}</span>
                <span className="text-xl">{bidPrice.pipsOrSmall}</span>
                <span className="text-sm">{bidPrice.small}</span>
              </p>
            ) : ( */}
            <p
              className={`${bidColor} leading-5 transition-colors duration-200`}
            >
              <span>{ask}</span>
              {/* <span className="text-sx">{bidPrice.pipsOrSmall}</span> */}
            </p>
            {/* )} */}
            <p className="text-sm text-grayprimary w-[85px]">
              <span>L: </span>
              {low.toFixed(2)}
            </p>
          </div>

          {/* ASK */}
          <div className="text-right pl-2">
            {/* {askPrice.isPipFormatted ? (
              <p
                className={`${askColor} leading-5 transition-colors duration-200 flex items-baseline`}
              >
                <span className="text-xs">{askPrice.main}</span>
                <span className="text-sm">{askPrice.pipsOrSmall}</span>
                <span className="text-xs">{askPrice.small}</span>
              </p>
            ) : ( */}
            <p
              className={`${askColor} leading-5 transition-colors duration-200`}
            >
              {/* <span>{askPrice.main}</span> */}
              <span>{bid}</span>
              {/* <span className="text-sx">{askPrice.pipsOrSmall}</span> */}
            </p>
            {/* )} */}
            <p className="text-sm text-grayprimary w-[85px]">
              <span>H: </span>
              {high.toFixed(2)}
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Card;
