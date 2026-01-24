import { useEffect, useRef } from "react";

import home from "../assets/icons/home.svg";
import homeselected from "../assets/icons/homeselected.svg";

import listIcon from "../assets/icons/listIcon.svg";
import listselected from "../assets/icons/listselected.svg";

import portfolioIcon from "../assets/icons/portfolioIcon.svg";
import portfolioselected from "../assets/icons/portfolioselected.svg";

import orderIcon from "../assets/icons/orderIcon.svg";
import orderselected from "../assets/icons/orderselected.svg";

import historyIcon from "../assets/icons/historyIcon.svg";
import historyselected from "../assets/icons/historyselected.svg";

export const navItems = [
  {
    label: "Home",
    path: "/",
    icon: home,
    selectedIcon: homeselected,
  },
  {
    label: "My list",
    path: "/mylist",
    icon: listIcon,
    selectedIcon: listselected,
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: portfolioIcon,
    selectedIcon: portfolioselected,
  },
  {
    label: "Order",
    path: "/orders",
    icon: orderIcon,
    selectedIcon: orderselected,
  },
  {
    label: "History",
    path: "/history",
    icon: historyIcon,
    selectedIcon: historyselected,
  },
];


export const calculatePnL = ({
  side,
  entryPrice,
  bid,
  ask,
  quantity,
}: {
  side: "buy" | "sell";
  entryPrice: number;
  bid?: number;
  ask?: number;
  quantity: number;
}) => {
  if (side === "buy") {
    if (bid == null) return 0;
    return (bid - entryPrice) * quantity;
  }

  // sell
  if (ask == null) return 0;
  return (entryPrice - ask) * quantity;
};

export const calculateBuySellPercent = (
  bid?: number,
  ask?: number
) => {
  if (!bid || !ask || bid === ask) {
    return { buyPercent: 50, sellPercent: 50 };
  }

  const total = bid + ask;

  const buyPercent = Math.round((bid / total) * 100);
  const sellPercent = 100 - buyPercent;

  return { buyPercent, sellPercent };
};

export interface FormattedPrice {
  isPipFormatted: boolean;
  main: string;
  pipsOrSmall: string; 
  small: string;
}


export const formatPrice = (
  price: number | number[],
  pip?: number | string
): FormattedPrice => {
  const numericPrice = Array.isArray(price) ? price[0] : price;

  if (typeof numericPrice !== "number" || isNaN(numericPrice)) {
    return {
      isPipFormatted: false,
      main: "0.00",
      pipsOrSmall: "",
      small: "",
    };
  }

  const pipValue = typeof pip === "string" ? parseFloat(pip) : pip;

  if (pipValue && !isNaN(pipValue) && pipValue < 0.1) {
    const priceStr = numericPrice.toString();
    const parts = priceStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";
    const pipDecimalPlaces = Math.round(Math.log10(1 / pipValue));

    if (decimalPart.length >= pipDecimalPlaces - 2) {
      const normalDecimalPlaces = pipDecimalPlaces - 2;
      return {
        isPipFormatted: true,
        main: `${integerPart}.${decimalPart.slice(0, normalDecimalPlaces)}`,
        pipsOrSmall: decimalPart.slice(normalDecimalPlaces, pipDecimalPlaces),
        small: decimalPart.slice(pipDecimalPlaces),
      };
    }
  }

  const priceStr = numericPrice.toFixed(4);
  const parts = priceStr.split(".");
  return {
    isPipFormatted: false,
    main: `${parts[0]}.${parts[1].slice(0, 2)}`,
    pipsOrSmall: parts[1].slice(2),
    small: "",
  };
};




export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const formatEpochToTime = (epoch: number) => {
  const date = new Date(epoch * 1000); // epoch in seconds

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

