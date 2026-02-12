import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";
import rightArrowblack from "../../assets/icons/rightarrowblack.svg";
import exchangeIcon from "../../assets/icons/exchangeIcon.svg";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { type PlaceOrderPayload } from "../../store/slices/ordersSlice";
import { placeOrderStock } from "../../service/api";
import { showToasty } from "../../store/slices/notificationSlice";
import { fetchAccounts } from "../../store/slices/accountSlice";

interface Account {
  id: string;
  username: string;
  balance: number;      
  currency?: string;
  type?: string;
}

const InstrumentOrderPlace = () => {
  const location = useLocation();
  const { instrumentData, side } = location.state || {};

  const sliderRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [marketPrice, setMarketPrice] = useState<number>(1);
  const [exchange, setExchange] = useState<"NSE" | "BSE">("NSE");
  const [value, setValue] = useState<"intraday" | "longterm">("intraday");
  const [dragX, setDragX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const selectedInstrumentId = useAppSelector(
    (state) => state.instruments.selectedInstrumentId
  );
    console.log(marketPrice)
  const accountsData = useAppSelector(
    (state) => state.accounts.data as Account[]
  );

  const apiStatus = useAppSelector(state => state.websockets.apiStatus)
  const accountUsernames = accountsData.map((acc) => acc.username);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  console.log(accountsData)
  console.log(side , instrumentData)
  const dispatch = useAppDispatch();

  // const accountBalance =
  // accountsData.find(acc => acc.username === selectedAccount)?.balance || 0;

const ltp =
  instrumentData?.dinamic_data?.quotes?.ltp?.[0] || 0;

const contractSize =
  instrumentData?.static_data?.contractsize || 1;

  const requiredBalance =  ltp * quantity * contractSize;
  const availableBalance = accountsData[0]?.balance - requiredBalance;

  useEffect(() => {
    console.log("fetch Account")
    dispatch(fetchAccounts());
  }, [apiStatus]);

  useEffect(() => {
    if (accountUsernames.length && !selectedAccount) {
      setSelectedAccount(accountUsernames[0]);
    }
  }, [accountUsernames, selectedAccount]);

  const handleSlideConfirm = async () => {
    if (!instrumentData || !selectedInstrumentId) return;

    const selectedAccountId =
      accountsData.find((acc) => acc.username === selectedAccount)?.id || "";

    const payload: PlaceOrderPayload = {
      account_id: selectedAccountId,
      instrument_id: selectedInstrumentId,
      order_type: "market",
      price: instrumentData.price,
      qty: quantity,
      side: side,
      stoploss: 4,
      target: 8,
    };

    const response = await placeOrderStock(payload);

    if (response?.stats === "success") {
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
  };

  const quentyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^0+(?=\d)/, "");
    if (value !== "") setQuantity(Number(value));
  };

  const maxDrag = 230;

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
        handleSlideConfirm();
        cleanup();
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
    <div className="min-h-screen">
      <TrendingListHeader
        label={instrumentData?.trading_name}
        showFilterSearch={false}
      />

      {/* FIXED HEIGHT */}
      <div className="w-full h-[calc(100vh-55px)] bg-bgprimary px-4 pt-5 flex flex-col justify-between">

        {/* TOP */}
        <div className="gap-2.5">

          {/* EXCHANGE */}
          <div className="flex gap-7.5 text-[14px] text-grayprimary">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={exchange === "NSE"}
                onChange={() => setExchange("NSE")}
                className="hidden"
              />
              <span className={`w-[10px] h-[10px] rounded-full ${exchange === "NSE" ? "bg-main" : "border border-[#6B7C90]"}`} />
              NSE ₹1,948.40
            </label>

            <label className="flex items-center gap-2 cursor-pointer opacity-60">
              <input
                type="radio"
                checked={exchange === "BSE"}
                onChange={() => setExchange("BSE")}
                className="hidden"
              />
              <span className={`w-[10px] h-[10px] rounded-full ${exchange === "BSE" ? "bg-main" : "border border-[#6B7C90]"}`} />
              BSE ₹1,947.80
            </label>
          </div>

          {/* CARD */}
          <div className="bg-mainsecondary mt-2 rounded-[20px] p-[16px] flex flex-col gap-[20px]">

            {/* Quantity */}
            <div>
              <label className="text-grayprimary text-[14px] font-semibold mb-[6px] block">
                Quantity
              </label>
              <div className="border border-[rgba(217,217,217,0.2)] rounded-[10px] h-[44px] px-[12px] flex items-center bg-[#181818]">
                <input
                  type="number"
                  value={quantity}
                  onChange={quentyChange}
                  className="flex-1 bg-transparent outline-none px-[12px] text-white"
                />
                <button className="w-11 h-full flex items-center justify-center border-l border-[rgba(217,217,217,0.2)]">
                  <img src={exchangeIcon} />
                </button>
              </div>
            </div>

            {/* Market */}
            <div>
              <p className="text-grayprimary text-[14px] font-semibold mb-1.5">
                Market
              </p>
              <div className="border border-[rgba(217,217,217,0.2)] rounded-[10px] h-[44px] flex items-center px-[12px] bg-[#181818]">
                <input
                  disabled
                  value={marketPrice}
                  className="w-full bg-transparent outline-none text-[rgba(200,200,200,0.7)]"
                />
              </div>
            </div>

            {/* TYPE */}
            <div className="flex flex-end gap-5">
              {["intraday", "longterm"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={value === t}
                    onChange={() => setValue(t as any)}
                    className="hidden"
                  />
                  <span className={`w-[10px] h-[10px] rounded-full ${value === t ? "bg-main" : "border border-[#6B7C90]"}`} />
                  <span className="text-white text-[12px] capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pb-5">

          <div className="flex justify-between text-[12px] text-[#D2D2D2] mb-[10px]">
            <div>
              Amount <span className="text-main">₹{accountsData[0]?.balance}</span> 
              {/* <span className="text-main"> ₹2.02</span> */}
            </div>
            <div>
              Avail. <span className="text-main">₹{availableBalance}</span>
            </div>
          </div>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="relative w-full max-w-[300px] mx-auto h-[56px]
                       bg-blacksecondary rounded-full flex items-center
                       px-[6px] overflow-hidden"
          >
            <span className="absolute w-full text-center text-[14px] text-[#8A8A8A]">
              {confirmed ? "Confirmed" : "Drag to Confirm"}
            </span>

            <div
              ref={knobRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              style={{ transform: `translateX(${dragX}px)` }}
              className="absolute w-14 h-14 bg-main rounded-full
                         flex items-center justify-center cursor-pointer"
            >
              <img src={rightArrowblack} className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstrumentOrderPlace;
