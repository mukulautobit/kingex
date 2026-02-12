// import React from "react";
import avatar from "../../assets/icons/avatar.svg";
import wallet from "../../assets/icons/wallet.svg";
import bank from "../../assets/icons/bank.svg";
import { useNavigate } from "react-router-dom";
import TrendingListHeader from "../../components/tradingListHeader/TrendingListHeader";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="
      relative
    w-full max-w-103
    min-h-screen
    px-5 py-2.5
    flex flex-col
    bg-blacktertiary
  "
    >
      <TrendingListHeader label={"Profile"} />

      {/* ---------- CONTENT ---------- */}
      <div className="flex flex-col items-center gap-[10px]">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-[10px]">
          <div className="w-[175px] h-[175px] rounded-full flex items-center justify-center">
            <img
              src={avatar}
              alt="avatar"
              className="w-[130px] h-[130px] rounded-full"
            />
          </div>

          <span className="text-[28px] font-semibold text-white text-center">
            John Smith
          </span>
        </div>

        {/* Wallet */}
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center py-[16px]">
            <div className="flex items-center gap-[10px]">
              <img src={wallet} className="w-[24px] h-[24px]" />
              <div className="flex flex-col">
                <span className="text-[14px] text-[#D9D9D9]">₹0.00</span>
                <span className="text-[12px] text-[rgba(217,217,217,0.3)]">
                  Stocks, F&O balance
                </span>
              </div>
            </div>

            <button
              className="
            px-[16px] py-[8px]
            bg-[rgba(0,179,6,0.2)]
            border border-[rgba(0,179,6,0.5)]
            rounded-[8px]
            text-[10px] text-[#00B306]
          "
            >
              Add Money
            </button>
          </div>

          <div className="border-b border-[#181818]" />
        </div>

        {/* Account Details */}
        <div className="w-full flex items-center gap-[10px] py-[16px]">
          <img src={bank} className="w-[24px] h-[24px]" />
          <span className="text-[14px] text-[#D9D9D9]">
            Account Details
          </span>
        </div>

        {/* Logout Now Below Content */}
        <button
          onClick={handleLogout}
          className="
        w-93 fixed bottom-2.5 h-11.5
        bg-main
        rounded-[10px]
        text-[14px] font-medium
        text-blackprimary
        mt-5
      "
        >
          Logout
        </button>

      </div>
    </div>

  );
};

export default Profile;
