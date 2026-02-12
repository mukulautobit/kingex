import React from "react";
import crossIcon from "../../assets/icons/crossIcon.svg";   // X icon
import searchIcon from "../../assets/icons/searchIcon.svg";

interface SearchHeaderBarProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  onClear: () => void;
}

const SearchHeaderBar: React.FC<SearchHeaderBarProps> = ({
  value,
  onChange,
  onClose,
  onClear,
}) => {
  return (
    <div
      className="
        flex items-center gap-[10px]
        px-[20px]
        h-[55px]
        w-full
      "
    >
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="w-[35px] h-[35px] flex items-center justify-center"
      >
        <img src={crossIcon} 
        // className="w-[18px] h-[18px]" 
        />
      </button>

      {/* Search Field */}
      <div
        className="
          flex items-center gap-[12px]
          px-[8px] py-[7px]
          h-[35px]
          flex-1
          bg-[#181818]
          rounded-[10px]
        "
      >
        <img
          src={searchIcon}
          className="w-[15.63px] h-[15.78px]"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className="
            flex-1
            bg-transparent
            outline-none
            text-[14px]
            font-poppins
            font-light
            text-[#D9D9D9]
          "
        />

        {/* Clear */}
        {value && (
          <button
            onClick={onClear}
            className="text-[14px] text-[#D9D9D9] opacity-20"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchHeaderBar;
