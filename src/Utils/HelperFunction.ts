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
