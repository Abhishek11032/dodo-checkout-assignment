import type { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function Button({
  children,
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        flex w-full items-center justify-center gap-2
        rounded-xl bg-black px-4 py-3
        font-medium text-white
        transition-all duration-200
        hover:scale-[1.01]
        hover:opacity-90
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:scale-100
        ${className}
      `}
    >
      {loading && (
        <Spinner size="sm" />
      )}

      {loading ? "Processing Payment..." : children}
    </button>
  );
}

export default Button;