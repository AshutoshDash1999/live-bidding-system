import { FC } from "react";
import { twMerge } from "tailwind-merge";

const Input: FC<InputProps> = ({
  label,
  placeholder,
  inputType = "text",
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  return (
    <div className={twMerge("my-2", className)}>
      {label && (
        <label
          htmlFor="custom_input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 p-2.5  rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
        {leftIcon}

        <input
          {...props}
          type={inputType}
          id="custom_input"
          className=" text-gray-900 text-sm w-full focus:outline-none caret-purple-700"
          placeholder={placeholder || label}
          required
        />

        {rightIcon}
      </div>
    </div>
  );
};
export default Input;
