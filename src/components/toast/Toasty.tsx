// src/components/toasty/Toasty.tsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/Store";
// import { hideToasty } from "../../store/slices/notificationSlice";
// import { useAppSelector } from "../../store/hook";
import { hideToasty } from "../../store/slices/notificationSlice";
// import "./Toasty.css";

const Toasty = () => {
  const dispatch = useDispatch();
  const { data, isVisible } = useSelector(
    (state: RootState) => state.notification
  );

  // const theme = useAppSelector(state => state.theme.mode)

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          dispatch(hideToasty());
        }, 300); // Match CSS exit animation duration
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible || !data) return null;

  const isOrderToast = data.price !== undefined && data.quantity !== undefined;
  const isSuccess =
    data.type === "success" ||
    data.status?.toLowerCase() === "filled" ||
    data.status?.toLowerCase() === "success";
  const isError =
    data.type === "error" || data.status?.toLowerCase() === "failed";

  console.log(isError)

  // const getClassName = () => {
  //   let classes = "toasty-pill";
  //   if (isSuccess) classes += " toasty-success";
  //   else if (isError) classes += " toasty-error";
  //   else classes += " toasty-info";

  //   if (isExiting) classes += " toasty-exit";
  //   return classes;
  // };

  const getDisplayText = () => {
    if (isOrderToast) {
      return isSuccess ? "Order Successful" : "Order Unsuccessful";
    }
    return data.message || data.title || "Notification";
  };

  return (
    <div className="fixed inset-0 z-10000 pointer-events-none flex justify-center items-start pt-5">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 pointer-events-auto
        ${isExiting
            ? "animate-[fadeOut_0.3s_ease-in_forwards]"
            : "animate-[fadeIn_0.3s_ease-out_forwards]"
          }
      `}
      />

      {/* Toast */}
      <div
        className={`
    relative z-[10001]
    min-w-[250px] h-[44px]
    px-4 py-2
    rounded-[10px]
    text-[16px] font-medium
    shadow-[0_4px_15px_rgba(0,0,0,0.3)]
    flex items-center justify-center
    pointer-events-auto
    text-white

    ${isSuccess && "bg-main"}
    ${isError && "bg-red-600"}
    ${!isSuccess && !isError && "bg-[#2A2A2A]"}

    ${isExiting
            ? "animate-[slideOutUp_0.3s_ease-in_forwards]"
            : "animate-[slideInDown_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]"
          }
  `}
      >

        {getDisplayText()}
      </div>

      {/* Keyframes (Tailwind v4 inline) */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutUp {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
      `}
      </style>
    </div>
  );

};

export default Toasty;