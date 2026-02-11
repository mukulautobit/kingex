// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../Utils/HelperFunction";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        fixed bottom-0 block left-1/2 -translate-x-1/2
        z-[100]
        max-w-[412px] h-[97px]
        p-[16px]
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex items-center justify-between
          w-full h-[65px]
          px-[16px] py-[10px]
          gap-[36px]
          rounded-[20px]
          bg-[rgba(24,24,24,0.2)]
          backdrop-blur-md
        "
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center gap-[6px]
                w-[60px] h-[45px]
                transition-all
                ${isActive ? "opacity-100" : "opacity-20"}
              `}
            >
              <img
                src={isActive ? item.selectedIcon : item.icon}
                alt={item.label}
                className="w-[24px] h-[24px]"
              />

              <span
                className={`
                  font-poppins
                  text-[10px] leading-[15px]
                  
                  ${isActive ? "text-grayprimary font-medium" : "font-light text-[#FAFAFA]"}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
