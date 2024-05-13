import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
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
  buttonLoading,
  showPasswordAction = false,
  ...props
}) => {
  const [showPasswordIcon, setshowPasswordIcon] = useState(false);

  const showPasswordHandler = () => {
    setshowPasswordIcon(!showPasswordIcon);
  };

  return (
    <div className={twMerge("my-2", className)}>
      {label && (
        <label
          htmlFor={id || "custom_input"}
          className="block mb-2 text-lg font-semibold text-gray-900"
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
          {...props}
          name={name}
          type={showPasswordIcon ? inputType : "text"}
          id={id || "custom_input"}
          className=" text-gray-900 text-md w-full focus:outline-none caret-purple-700 disabled:bg-neutral-200 font-semibold"
          placeholder={placeholder || label}
          required
          disabled={disabled}
          value={value}
          onChange={onChange}
        />

        {rightIcon}

        {showPasswordAction ? (
          <div onClick={showPasswordHandler} className="cursor-pointer">
            {showPasswordIcon ? (
              <EyeIcon className="h-6 text-purple-600" />
            ) : (
              <EyeSlashIcon className="h-6 text-purple-600" />
            )}
          </div>
        ) : null}

        {variant === "input-with-button" ? (
          <Button
            onClick={onButtonClick}
            className="my-0"
            loading={buttonLoading}
          >
            {buttonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};
export default Input;
