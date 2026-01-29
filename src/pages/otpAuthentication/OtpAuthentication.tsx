import { useRef, useState } from "react";
import otpIcon from "../../assets/icons/otpIcononly.svg";
import tickIcon from "../../assets/icons/loginTick.svg";
import loderIcon from "../../assets/icons/loader.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../service/api";
import { showToasty } from "../../store/slices/notificationSlice";
import { useAppDispatch } from "../../store/hook";
// import { initializeSockets } from "../../service/socketService";
// import { store } from "../../store/Store";

/* ---------------- SUCCESS SCREEN ---------------- */

const LoginSuccessfulPage = ({ onGoHome }: { onGoHome: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-[20px] bg-blackprimary">
      <div className="flex flex-col items-center gap-[44px]">

        <div className="flex flex-col items-center gap-[10px] w-[282px]">
          <div className="relative w-[106px] h-[106px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[6px] border-[#FACA46]" />
            <img src={tickIcon} className="w-[76px] h-[76px]" />
          </div>

          <h1 className="text-[16px] font-semibold text-[#FACA46] text-center">
            Login Successfully
          </h1>

          <p className="text-[12px] text-[#D9D9D9] text-center">
            Congratulations on successfully logged in <br /> Kingex
          </p>
        </div>

        <button
          onClick={onGoHome}
          className="w-[174px] h-[44px] bg-[#FACA46] rounded-[6px] text-[#0D0D0D]"
        >
          Go home
        </button>
      </div>
    </div>
  );
};

/* ---------------- OTP AUTH ---------------- */

const OtpAuthentication = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [screen, setScreen] = useState<
    "otp" | "loading" | "success"
  >("otp");
  const tokenRef = useRef<string>("")

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  /* ---------- OTP INPUT ---------- */

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /* ---------- VERIFY ---------- */

  const location = useLocation();
const phone = location.state?.phone;
console.log(phone)

 const handleVerify = async () => {
  const otpValue = otp.join("");

  if (otpValue.length !== 6) return;

  setScreen("loading");

  try {
    const res = await verifyOtp("+91", phone, otpValue);
    console.log("VERIFY RESPONSE:", res);

    // assume success if API returns ok
    if(res.status === 'success'){
      setScreen("success");
      localStorage.setItem("token", res?.data.token)
      dispatch(
    showToasty({
    type: "success",
    message: "Login successfully"
  })
);

    }
    // initializeSockets(store)
  } catch (err) {
    console.log(err);
    alert("Invalid OTP");
    setScreen("otp");
  }
};

  /* ---------------- SUCCESS ---------------- */

  if (screen === "success") {
    localStorage.setItem("ASSESS","Allow")
    return <LoginSuccessfulPage onGoHome={() => navigate("/")} />;
  }

  /* ---------------- LOADER ---------------- */

  if (screen === "loading") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blackprimary">
        <img
          src={loderIcon}
          className="w-[48px] h-[48px] animate-spin"
        />
        <p className="text-[#D9D9D9] text-[12px] mt-4">
          Verifying OTP...
        </p>
      </div>
    );
  }

  /* ---------------- OTP SCREEN ---------------- */

  return (
    <div
      className="
        min-h-screen
        flex flex-col items-center justify-between
        px-[20px]
        pt-[186px]
        pb-[206px]
        bg-blackprimary
      "
    >
      {/* ICON */}
     <div className="flex flex-col items-center gap-[22px] relative">
  <img src={otpIcon} className="w-[256px] h-[256px]" />

  <h1 className="text-main absolute top-[150px]">
    Enter One Time Password
  </h1>

  <p
    className="
      text-grayprimary
      absolute top-[175px]
      font-poppins
      font-normal
      text-[12px]
      leading-[12px]
      tracking-[0]
      text-center
    "
  >
    One time password is sent to your Registered Phone Number
  </p>
</div>


      {/* OTP INPUTS */}
      <div className="flex flex-col items-center gap-[20px]">

        <div className="flex gap-[13px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              className="
                w-[46px] h-[56px]
                text-center
                text-[30px]
                text-[#FACA46]
                bg-[rgba(250,202,70,0.1)]
                border border-[#FACA46]
                rounded-[6px]
                outline-none
              "
            />
          ))}
        </div>

        <div className="flex gap-[3px] text-[12px]">
          <span className="text-[#D9D9D9]">Don’t receive OTP ?</span>
          <button className="text-[#FACA46] font-medium">
            RESEND OTP
          </button>
        </div>

        <button
          onClick={handleVerify}
          className="
            mt-[30px]
            px-[40px] py-[6px]
            bg-[#FACA46]
            rounded-[4px]
            text-[16px]
            font-medium
            text-[#0D0D0D]
            uppercase
          "
        >
          Verify
        </button>

      </div>
    </div>
  );
};

export default OtpAuthentication;
