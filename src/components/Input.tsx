import { FC } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

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
  variant,
  buttonText = "Submit",
  onButtonClick = () => {},
  ...props
}) => {
  return (
    <div className={twMerge("my-2", className)}>
      {label && (
        <label
          htmlFor={id || "custom_input"}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 bg-gray-50 border border-gray-300 p-2  rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 ${
          disabled ? "bg-neutral-200" : null
        }`}
      >
        {leftIcon}

        <input
          name={name}
          {...props}
          type={inputType}
          id={id || "custom_input"}
          className=" text-gray-900 text-md w-full focus:outline-none caret-purple-700 disabled:bg-neutral-200 font-semibold"
          placeholder={placeholder || label}
          required
          disabled={disabled}
          value={value}
          onChange={onChange}
        />

        {rightIcon}

        {variant === "input-with-button" ? (
          <Button onClick={onButtonClick} className="my-0">
            {buttonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};
export default Input;
