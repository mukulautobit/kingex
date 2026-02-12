import  {useState} from 'react'
import kingexLogo  from "../../assets/icons/kingxlogo.svg"
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../service/api";
import { showToasty } from '../../store/slices/notificationSlice';
import { useAppDispatch } from '../../store/hook';



// import { useNavigate } from "react-router-dom";






// ------------------------LOGIN------------------>

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate()


  const dispatch = useAppDispatch()
  const handleContinue = async () => {
  if (phone.trim().length !== 10) {
    console.log(phone)
    setError("Please Enter Correct Number");
    return;
  }

  setError("");

  try {
    console.log("before send")
    const res = await sendOtp("+91", phone);
    console.log("OTP SENT:", res);
    
    if(res.status ==="success"){

      dispatch(
          showToasty({
          type: "success",
          message: "OTP successfully"
        }))
    }

    navigate("/optauthentication", {
      state: { phone }
    });

  } catch (err) {
    console.log(err);
    alert("Failed to send OTP");
  }
};

  return (
    <div 
    className="
    min-h-screen
     md:m-w-[412px] w-full   bg-linear-to-tr from-main via-blackprimary to-black flex flex-col justify-between px-[20px] pt-[47px] pb-[20px]"
    >
      
      {/* ---------- TOP ---------- */}
      <div className="flex flex-col items-center gap-5.5">
        
        {/* Logo */}
        <div className="w-88.35 h-37.35 flex justify-center items-center">
          <img
            src={kingexLogo}
            alt="Kingex"
            className="w-32.25 h-32.25"
          />
        </div>

        {/* Content */}
        <div className="m-w-[353px] flex flex-col gap-5.5">
          
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-medium text-[#FAFAFA]">
              Let’s get started
            </h1>
            <p className="text-[14px] text-[#878787]">
              we'll send you a one-time password (OTP) to verify your mobile number
            </p>
          </div>

          {/* Phone Input */}
          <div className="flex flex-col gap-[7px]">
            <span className="text-[14px] font-semibold text-[#FAFAFA]">
              Enter your number
            </span>

            <div className="flex gap-[4px]">
              
              {/* Country Code */}
              <div className="w-[44px] h-[44px] bg-[#0C0C0C] rounded-[10px] flex items-center justify-center">
                <span className="text-[14px] text-white">+91</span>
              </div>

              {/* Number Input */}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9456-952635"
                className={`w-full m-w-[305px] mx-auto h-11 px-2.5 bg-[#0C0C0C] rounded-[10px]
                  text-[14px] text-white outline-none
                  ${error ? "border border-[#B30000]" : ""}
                `}
              />
            </div>

            {error && (
              <span className="text-[14px] font-light text-[#B30000]">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM ---------- */}
      <div className="w-full max-w-88.25 mx-auto flex flex-col gap-[10px]">
        
        <p className="text-[10px] text-white text-center">
          KINGEX SECURITIES PRIVATE LIMITED SEBI Regn No.
          INZ000358317 NSE TM Code: 13942 | BSE TM Code: 6515
          | CDSL ID: IN-DP-570-2024 | MCX Commodities India Pvt Ltd SEBI Regn No.
          INZ000358317 | MCX TM Code: 48510
        </p>

        <button
          onClick={handleContinue}
          className="w-full h-11 bg-main rounded-[10px]
                     text-[16px] font-medium text-grayprimary"
        >
          Continue
        </button>

        <p className="text-[12px] text-white text-center">
          By continuing, I accept kingex’s{" "}
          <span className="underline">T&C</span> and{" "}
          <span className="underline">Privacy policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
