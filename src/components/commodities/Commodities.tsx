import React from 'react'
import CommoditiesHeader, { type CommoditiesHeaderProps } from '../commoditiesheader/CommoditiesHeader'
import CommoditiesItem from '../commoditiesItem/CommoditiesItem'
import { useNavigate } from 'react-router-dom'



const Commodities = ({icon, label}:CommoditiesHeaderProps) => {

  const navigate = useNavigate()

   const handleCardClick = (index:number)=>{
        const data = {
            value : "970272",
            name : "abcd"
        }

        navigate("/instrumentDetails", {
            state : {
                instrumentData : data
            }
        })
    }
  return (
   <div
      className="
        w-full
        h-[312px]
        px-[20px] pt-[10px] pb-[20px]
        border-t border-blacksecondary
        flex flex-col gap-[10px]
      "
    >
     <CommoditiesHeader icon={icon} label={label}/>

       {/* ---------- ITEMS ---------- */}
      <div className="flex flex-col">
        {[...Array(4)].map((_, index) => {
          const priceColor =
            index % 2 === 0 ? "text-[#FF3B30]" : "text-[#00B306]";

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
            >
              <CommoditiesItem priceColor={priceColor} />
            </div>
          );
        })}
        
      </div>
    </div>
  )
}

export default Commodities;
