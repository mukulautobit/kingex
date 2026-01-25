import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";
import rightArrowblack from "../../assets/icons/rightarrowblack.svg";
import exchangeIcon from "../../assets/icons/exchangeIcon.svg";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { placeNewOrder, type PlaceOrderPayload } from "../../store/slices/ordersSlice";
import { placeOrderStock } from "../../service/api";
import { hideToasty, showToasty } from "../../store/slices/notificationSlice";
import { fetchAccounts } from "../../store/slices/accountSlice";

interface Account {
  id: string;
  username: string;
}

const InstrumentOrderPlace = () => {
  const location = useLocation();
  const { instrumentData } = location.state || {};

  const sliderRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  console.log(instrumentData);

  const [quantity, setQuantity] = useState<number>(1);
  const [marketPrice, setMarketPrice] = useState<number>(1);
  const [exchange, setExchange] = useState<"NSE" | "BSE">("NSE");
  const [value, setValue] = useState<"intraday" | "longterm">("intraday");
  const [dragX, setDragX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const selectedInstrumentId = useAppSelector((state) => state.instruments.selectedInstrumentId)
  const accountsData = useAppSelector(
    (state) => state.accounts.data as Account[]
  );
  const accountUsernames = accountsData.map((acc) => acc.username);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  // console.log(selectedInstrumentId)

  useEffect(() => {
    if (accountUsernames.length > 0 && !selectedAccount) {
      setSelectedAccount(accountUsernames[0]);
    }
  }, [accountUsernames, selectedAccount]);

  const dispatch = useAppDispatch()

  const maxDrag = 230; // width - knob size

    useEffect(()=>{
      dispatch(fetchAccounts())
    },[])

  const handleSlideConfirm = async () => {
    if (!instrumentData) return;

    const selectedAccountId =
      accountsData.find(
        (acc) => acc.username === selectedAccount
      )?.id || ""

    // const orderPayload = {
    //   account_id:selectedAccountId,
    //   instrumentId: selectedInstrumentId,
    //   tradingName: instrumentData.trading_name,
    //   side: instrumentData.side,          // buy / sell
    //   quantity,
    //   // exchange,
    //   tradeType: value,                   // intraday / longterm
    //   price: instrumentData?.price,
    // };
    console.log(accountsData, accountUsernames)
    if (!selectedInstrumentId) {
      console.error("Instrument ID missing");
      return;
    }

    console.log(selectedAccountId)
    const payload: PlaceOrderPayload = {
      account_id: selectedAccountId,
      instrument_id: selectedInstrumentId,
      order_type: "market",
      price: instrumentData.price,
      qty: quantity,
      side: "sell", // literal, not string
      stoploss: 4,
      target: 8,
    };
    console.log("handleSlideConfirm", selectedAccountId)
    // dispatch(placeNewOrder(payload));

    const response = await placeOrderStock(payload)
    console.log(response)
    if(response.stats === 'success'){
       dispatch(
      showToasty({
        message: "Order placed successfully",
        type: "success",
        price: payload.price,
        quantity: payload.qty,
        status: "filled",
      })
    );
    }
   

    // ✅ HIDE AFTER 2 SECONDS
    // setTimeout(() => {
    //   dispatch(hideToasty());
    // }, 2000);

    // or call API here
  };

  const quentyChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log("change triger", e.target.value)
    let value = e.target.value;

  // remove leading zeros
  value = value.replace(/^0+(?=\d)/, "");

  if (value === "") {
    // setQuantity("");
  } else {
    setQuantity(Number(value));
  }
  }



  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (confirmed) return;

    const startX =
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const onMove = (ev: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in ev ? ev.touches[0].clientX : ev.clientX;

      let newX = clientX - startX + dragX;
      newX = Math.max(0, Math.min(newX, maxDrag));

      setDragX(newX);

      if (newX >= maxDrag) {
        setConfirmed(true);
        handleSlideConfirm();   // 👈 CALL YOUR FUNCTION HERE
        cleanup();
        console.log("Order Confirmed");

      }
    };

    const cleanup = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", cleanup);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", cleanup);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", cleanup);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", cleanup);
  };

  return (
    <div>
      <TrendingListHeader
        label={instrumentData?.trading_name}
        showFilterSearch={false}
      />

      <div className="w-full min-h-204.25 bg-blackprimary px-4 pt-5 flex flex-col justify-between">
        <div className="gap-2.5">
          {/* NSE / BSE */}
          <div className="flex gap-7.5 text-[14px] text-grayprimary">
            {/* NSE */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="exchange"
                value="NSE"
                checked={exchange === "NSE"}
                onChange={() => setExchange("NSE")}
                className="hidden"
              />
              <span
                className={`
                  w-[10px] h-[10px] rounded-full
                  ${exchange === "NSE"
                    ? "bg-main"
                    : "border border-[#6B7C90]"
                  }
                `}
              />
              NSE ₹1,948.40
            </label>

            {/* BSE */}
            <label className="flex items-center gap-2 cursor-pointer opacity-60">
              <input
                type="radio"
                name="exchange"
                value="BSE"
                checked={exchange === "BSE"}
                onChange={() => setExchange("BSE")}
                className="hidden"
              />
              <span
                className={`
                  w-[10px] h-[10px] rounded-full
                  ${exchange === "BSE"
                    ? "bg-main"
                    : "border border-[#6B7C90]"
                  }
                `}
              />
              BSE ₹1,947.80
            </label>
          </div>

          {/* Card */}
          <div className="bg-blacksecondary mt-2 rounded-[20px] p-[16px] flex flex-col gap-[20px]">
            {/* Quantity */}
            <div>
              <label className="text-[#D9D9D9] text-[14px] font-semibold mb-[6px] block">
                Quantity
              </label>

              <div className="border border-[rgba(217,217,217,0.2)] rounded-[10px] h-[44px] px-[12px] flex items-center bg-[#181818]">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e)=>quentyChange(e)}
                  className="flex-1 bg-transparent outline-none px-[12px] text-[16px] text-white"
                />

                <button
                  type="button"
                  className="w-[44px] h-full flex items-center justify-center border-l border-[rgba(217,217,217,0.2)]"
                >
                  <img
                    src={exchangeIcon}
                    alt="exchange"
                    className="w-[22px] h-[17px]"
                  />
                </button>
              </div>
            </div>

            {/* Market */}
            <div>
              <p className="text-[#D9D9D9] text-[14px] font-semibold mb-[6px]">
                Market
              </p>

              <div className="border border-[rgba(217,217,217,0.2)] rounded-[10px] h-[44px] flex items-center px-[12px] bg-[#181818]">
                <input
                  type="number"
                  placeholder="0.00"
                  value={marketPrice}
                  onChange={(e) =>
                    setMarketPrice(Number(e.target.value))
                  }
                  disabled={true}
                  className="w-full bg-transparent outline-none text-[16px] text-[rgba(200,200,200,0.7)] placeholder:text-[rgba(200,200,200,0.3)]"
                />

                <button
                  type="button"
                  className="w-[44px] h-full flex items-center justify-center border-l border-[rgba(217,217,217,0.2)]"
                >
                  <img
                    src={exchangeIcon}
                    alt="exchange"
                    className="w-[22px] h-[17px]"
                  />
                </button>
              </div>
            </div>

            {/* Intraday / Longterm */}
            <div className="flex gap-[20px]">
              {/* Intraday */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tradeType"
                  value="intraday"
                  checked={value === "intraday"}
                  onChange={() => setValue("intraday")}
                  className="hidden"
                />
                <span
                  className={`w-[10px] h-[10px] rounded-full ${value === "intraday"
                    ? "bg-main"
                    : "border border-[#6B7C90]"
                    }`}
                />
                <span className="text-white text-[12px]">
                  Intraday
                </span>
              </label>

              {/* Longterm */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tradeType"
                  value="longterm"
                  checked={value === "longterm"}
                  onChange={() => setValue("longterm")}
                  className="hidden"
                />
                <span
                  className={`w-[10px] h-[10px] rounded-full ${value === "longterm"
                    ? "bg-main"
                    : "border border-[#6B7C90]"
                    }`}
                />
                <span className="text-white text-[12px]">
                  Longterm
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pb-5">
          {/* Amount */}
          <div className="flex justify-between text-[12px] text-[#D2D2D2] mb-[10px]">
            <div>
              Amount <span className="text-main">₹1,100.44</span> +
              <span className="text-main"> ₹2.02</span>
            </div>
            <div>
              Avail. <span className="text-main">₹-185.60</span>
            </div>
          </div>

          {/* DRAG TO CONFIRM */}
          <div
            ref={sliderRef}
            className="relative w-full max-w-[300px] mx-auto h-17.5 bg-blacksecondary rounded-full flex items-center px-[6px]"
          >
            <span className="absolute w-full text-center text-[14px] text-[#8A8A8A]">
              {confirmed ? "Confirmed" : "Drag to Confirm"}
            </span>

            <div
              ref={knobRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              style={{ transform: `translateX(${dragX}px)` }}
              className="absolute w-16 h-16 bg-main rounded-full flex items-center justify-center cursor-pointer transition-transform"
            >
              <img
                src={rightArrowblack}
                className="w-10.5 h-10.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentOrderPlace;
