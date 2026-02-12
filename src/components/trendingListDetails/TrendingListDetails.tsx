import  { useState } from 'react'
import CommoditiesItem from '../commoditiesItem/CommoditiesItem';
import {  useNavigate } from 'react-router-dom';


const tabs = ["Options", "Stocks", "MCX"];

const filters = [
    { label: "Below 500", width: "w-[82px]" },
    { label: "Most bought", width: "w-[96px]" },
    { label: "Top gainers", width: "w-[91px]" },
    { label: "Top losers", width: "w-[81px]" },
];

const TrendingListDetails = () => {
    const [activeTab, setActiveTab] = useState("Options");
    const [active, setActive] = useState("Below 500");

    const navigate = useNavigate();

    const handleCardClick = (index: number) => {
        const data = {
            value: "970272",
            name: "abcd"
        }
        console.log(index)
        navigate("/instrumentDetails", {
            state: {
                instrumentData: data
            }
        })
    }


    return (
        <>
            {/*-----------------TABS----------------------*/}
            <div
                className="
        w-full max-w-[412px]
        h-[44px]
        px-[20px]
        flex items-start gap-[10px]
        border-b border-blacksecondary
      "
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;

                    const width =
                        tab === "Options"
                            ? "w-[68px]"
                            : tab === "Stocks"
                                ? "w-[58px]"
                                : "w-[46px]";

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
              ${width}
              h-[44px]
              px-[10px]
              flex items-center justify-center
              ${isActive ? "border-b-2 border-grayprimary" : ""}
            `}
                        >
                            <span
                                className={`
                font-poppins
                text-[12px] leading-[18px]
                text-[#D9D9D9]
                ${isActive ? "font-medium" : "font-light"}
              `}
                            >
                                {tab}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ----------------Buttons------------------ */}
            <div
                className="
        w-full max-w-[412px]
        h-[49px]
        px-[20px]
        flex items-center gap-[10px]
      "
            >
                {filters.map((item) => {
                    const isActive = active === item.label;

                    return (
                        <button
                            key={item.label}
                            onClick={() => setActive(item.label)}
                            className={`
                            ${item.width}
                            h-6.5
                            px-2.5 py-1
                            flex items-center justify-center
                            gap-2.5
                            rounded-md
                            border
                            transition-all
                            ${isActive
                                    ? "bg-mainsecondary border-main"
                                    : "border-grayprimary opacity-20"
                                }
                                `}
                        >
                            <span
                                className={`
                                 font-poppins font-normal
                                text-[12px] leading-4.5
                                 ${isActive
                                        ? "text-main"
                                        : "text-grayprimary"
                                    }
                                 `}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
            {/* -------------Cards DATA---------------- */}
            <div className="flex flex-col py-2.5 px-5">
                {/* {Array.from({ length: 10 }).map((_, index) => ( */}
                    <div onClick={() => { handleCardClick(1) }}>
                        <CommoditiesItem
                            tradeName={"SBI"}
                            exchange={"buy"}
                            ltp={5}
                            pnl={4}                 // ✅ FINAL VALUE PASSED
                            timestamp={1769246240}
                        />
                    </div>
                {/*  ))} */}
            </div>
        </>

    )
}

export default TrendingListDetails
