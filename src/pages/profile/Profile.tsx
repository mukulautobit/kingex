import React from "react";
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
        w-full max-w-[412px]
        min-h-screen
        px-[20px] py-[10px]
        flex flex-col justify-between
        bg-blackprimary
      "
    >
        <TrendingListHeader label={"Profile"} />
      {/* ---------- TOP SECTION ---------- */}
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

        {/* Wallet + Add Money */}
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
      </div>

      {/* ---------- LOGOUT ---------- */}
      <div className="py-[20px]">
        <button
          onClick={handleLogout}
          className="
            w-full h-[46px]
            bg-[#FACA46]
            rounded-[10px]
            text-[14px] font-medium
            text-[#0D0D0D]
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
