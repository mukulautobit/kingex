// import React from 'react'

const InfoHeader = () => {
  return (
    <div
      className="
        bg-blacktertiary
        flex items-start
        h-[79px]
        px-[20px] py-[10px]
      "
    >
      {/* NIFTY 50 */}
      <div
        className="
          flex items-center justify-between gap-[12px]
          h-[59px]
          flex-1
          p-[10px]
          bg-mainsecondary
          rounded-l-[10px]
        "
      >
        <span
          className="
            font-poppins font-medium
            text-[12px] leading-[18px]
            text-grayprimary
          "
        >
          NIFTY 50
        </span>

        <div className="flex flex-col items-end justify-center h-[39px]">
          <span
            className="
              font-poppins font-medium
              text-[14px] leading-[21px]
              text-[#00B306]
            "
          >
            25,289.30
          </span>

          <span
            className="
              font-poppins font-light
              text-[12px] leading-[18px]
              text-grayprimary
            "
          >
            +132.40 (0.53%)
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[1px] h-[59px] bg-[#0D0D0D]" />

      {/* NIFTY BANK */}
      <div
        className="
          flex items-center justify-between gap-[12px]
          h-[59px]
          flex-1
          p-[10px]
          bg-mainsecondary
          rounded-r-[10px]
        "
      >
        <span
          className="
            font-poppins font-medium
            text-[12px] leading-[18px]
            text-grayprimary
          "
        >
          NIFTY BANK
        </span>

        <div className="flex flex-col items-end justify-center h-[39px]">
          <span
            className="
              font-poppins font-medium
              text-[14px] leading-[21px]
              text-[#00B306]
            "
          >
            25,289.30
          </span>

          <span
            className="
              font-poppins font-light
              text-[12px] leading-[18px]
              text-grayprimary
            "
          >
            +132.40 (0.53%)
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoHeader
