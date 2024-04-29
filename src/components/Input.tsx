import { FC } from "react";
import { twMerge } from "tailwind-merge";

const Input: FC<InputProps> = ({
  label,
  placeholder,
  inputType = "text",
  leftIcon,
  rightIcon,
  className,
  disabled = false,
  name,
  id,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={twMerge("my-2", className)}>
      {label && (
        <label
          htmlFor={id || "custom_input"}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 bg-gray-50 border border-gray-300 p-2.5  rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 ${
          disabled ? "bg-neutral-200" : null
        }`}
      >
        {leftIcon}

        <input
          name={name}
          {...props}
          type={inputType}
          id={id || "custom_input"}
          className=" text-gray-900 text-sm w-full focus:outline-none caret-purple-700 disabled:bg-neutral-200"
          placeholder={placeholder || label}
          required
          disabled={disabled}
          value={value}
          onChange={onChange}
        />

        {rightIcon}
      </div>
    </div>
  );
};
export default Input;
