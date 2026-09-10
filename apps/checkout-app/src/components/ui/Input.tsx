import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId =
    id ||
    label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={inputId}
        {...props}
        className={`
          w-full rounded-xl border
          px-3 py-2.5
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition-all duration-200

          ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          }

          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;