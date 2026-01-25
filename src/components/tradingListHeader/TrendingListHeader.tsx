// import React from 'react'
import lineFilter from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import leftarrow from "../../assets/icons/leftarrow.svg"
import { useNavigate } from 'react-router-dom'
// import TrendingListDetails from '../trendingListDetails/TrendingListDetails'

export interface trendingListHeaderProps {
 label:string
 showFilterSearch?:boolean
}

const TrendingListHeader = ({label , showFilterSearch}:trendingListHeaderProps) => {
        const navigate = useNavigate()
  return (
    <div
      className="
        flex items-center justify-between
        h-[55px]
        px-[20px] py-[10px]
        w-full
      "
    >
      {/* Left: Back + Title */}
      <div className="flex items-center gap-[10px]">
        <button onClick={() => navigate(-1)}>
          <img
            src={leftarrow}
            alt="Back"
            className="w-[7.36px] h-[12.73px]"
          />
        </button>

        <span
          className="
            font-poppins font-medium
            text-[14px] leading-[21px]
            text-grayprimary
          "
        >
          {label}
        </span>
      </div>

      {/* Right: Filter + Search */}
      {
        showFilterSearch && (
          <div className="flex items-center gap-[14px]">
        <img
          src={lineFilter}
          alt="Filter"
          className="w-[24px] h-[24px]"
        />

        <img
          src={searchtwo}
          alt="Search"
          className="w-[24px] h-[24px]"
        />
      </div>
        )
      }
      
    </div>
  )
}

export default TrendingListHeader
