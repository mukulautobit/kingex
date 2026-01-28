import React from "react";

type ButtonVariant = "buy" | "sell" | "logout";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

const baseStyle = `
flex justify-center items-center
px-[16px] py-[10px]
h-[44px]
rounded-[8px]
font-semibold
text-[14px]
leading-[21px]
transition-all
`;

const variants: Record<ButtonVariant, string> = {
  buy: `
    bg-[#00B306]
    text-white
    shadow-[0px_0px_10px_#008508]
  `,
  sell: `
    bg-[#C50000]
    text-white
    shadow-[0px_0px_10px_#7a0000]
  `,
  logout: `
    bg-[#FFD35A]
    text-black
    shadow-[0px_0px_10px_#c9a300]
    w-full
  `,
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "buy",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${variants[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
