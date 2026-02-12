import  { useState } from 'react'
import SearchHeaderBar from '../../components/searchHeaderBar/SearchHeaderBar';
import CommoditiesItem from '../../components/commoditiesItem/CommoditiesItem';
type TabId = "all" | "cash" | "f&o" | "currency";

const tabs: { id: TabId; label: string; width: string }[] = [
    { id: "all", label: "All", width: "w-[50px]" },
    { id: "cash", label: "Cash", width: "w-[70px]" },
    { id: "f&o", label: "F&O", width: "w-[70px]" },
    { id: "currency", label: "Currency", width: "w-[70px]" },
];

const AllList = () => {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<TabId>("all");
    return (
        <div className="bg-blackprimary min-h-screen">

            {/* ---------- SEARCH HEADER ---------- */}
            <SearchHeaderBar
                value={query}
                onChange={setQuery}
                onClear={() => setQuery("")}
                onClose={() => console.log("close")}
            />

            {/* ---------- TABS ---------- */}
            <div className="w-full max-w-[412px] h-[44px] px-[20px] flex gap-[20px] border-b border-[#181818]">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`h-[44px] flex items-center justify-center ${isActive ? "border-b-2 border-[#D9D9D9]" : ""
                                }`}
                        >
                            <span
                                className={`text-[14px] text-[#D9D9D9] ${isActive ? "font-medium" : "font-light opacity-60"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ---------- TAB CONTENT ---------- */}
            <div className="w-full max-w-[412px] px-[20px] pt-[10px]">
                {activeTab === "all" && (
                    <div className="flex flex-col">
                        {[...Array(4)].map((_) => {
                            // const priceColor =
                            //     index % 2 === 0 ? "text-[#FF3B30]" : "text-[#00B306]";

                            return (
                                <CommoditiesItem
                                    tradeName={"SBI"}
                                    exchange={"buy"}
                                    ltp={5}
                                    pnl={4}                 // FINAL VALUE PASSED
                                    timestamp={1769246240}
                                />

                            );
                        })}
                    </div>
                )}

                {activeTab === "cash" && (
                    <div className="text-[12px] text-grayprimary py-[20px]">
                        No data available
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllList
