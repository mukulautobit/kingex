import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderBarProps {
  title?: string;
  showSearch?: boolean;
  leftLabel?: string;
  leftIcon?: string;
  rightIcons?: React.ReactNode;
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  onOpenDrawer?: () => void
}


const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showSearch = false,
  leftLabel = "AV",
  leftIcon,
  rightIcons,
  placeholder = "Search",
  onSearchChange,
  // onOpenDrawer
}) => {

  const location = useLocation();
  const navigate = useNavigate()
  const handleRightClick = () => {
    // event.stopPropagation()
      // if (onOpenDrawer) {
      //   onOpenDrawer();
      //   return;
      //   }

    const currentPath = location.pathname;
    console.log("CLICK PLUS", currentPath)
    if (currentPath === "/mylist") {
      navigate("/allList");
    }
  }

  return (
    <div className="bg-bgprimary flex items-center gap-2.5 h-[55px] px-5 py-2.5">

      {/* Left Avatar / Icon */}
      <div className="w-[35px] h-[35px] rounded-[10px] bg-mainsecondary flex items-center justify-center">
        {leftIcon ? (
          <img src={leftIcon} className="w-5 h-5" />
        ) : (
          <span className="text-white font-poppins font-medium text-[14px]" onClick={() => navigate("/profile")}>
            {leftLabel}
          </span>
        )}
      </div>

      {/* Center Section */}
      {showSearch ? (
        <div className="flex items-center gap-[12px] h-[35px] flex-1 px-[8px] py-[7px] rounded-[10px] bg-blacksecondary">
          {rightIcons}
          <input
            placeholder={placeholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 bg-transparent outline-none text-grayprimary font-poppins text-[14px]"
          />
        </div>
      ) : (
        <div className="flex-1 text-white font-poppins text-[16px]">
          {title}
        </div>
      )}

      {/* Right Icons */}
      {rightIcons && !showSearch && (
        <div onClick={ handleRightClick} className="flex items-center gap-3">
          {rightIcons}
        </div>
      )}
    </div>
  );
};

export default HeaderBar;
