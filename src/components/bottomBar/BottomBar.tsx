import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../Utils/HelperFunction";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-[85px]
        bg-[#1D1A23]
        border-t border-[#272727]
        shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]
        z-[100]
        flex justify-center
      "
    >
      {/* Inner container (max 412px) */}
      <div
        className="
          w-full max-w-[412px]
          flex justify-between items-center
          px-[16px] py-[20px]
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
                transition-opacity
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
                  text-[10px] leading-[15px] font-poppins
                  ${isActive ? "font-medium text-[#D9D9D9]" : "font-light text-[#D9D9D9]"}
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
