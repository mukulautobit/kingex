import type { ComponentType, SVGProps } from "react";
import trendingComodities from "../../assets/icons/trendingComodities.svg"
import rightArrow from "../../assets/icons/rightArrow.svg"
import { Link } from "react-router-dom";

export interface CommoditiesHeaderProps {
    icon?: string;
    label?: string;
}

const CommoditiesHeader = ({icon, label}:CommoditiesHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[8px]">
        {/* Left Icon */}
        <div className="w-[18px] h-[18px]">
          <img src={icon}/>
        </div>

        <span
          className="
            font-poppins font-medium
            text-[14px] leading-[21px]
            text-white
          "
        >
          {label}
        </span>
      </div>

      {/* Right Arrow */}
      <Link to={"/trendingList"}>
      <div className="w-[16px] h-[16px]">
        <img  src={rightArrow}  />
      </div>
      </Link>
    </div>
  )
}

export default CommoditiesHeader
