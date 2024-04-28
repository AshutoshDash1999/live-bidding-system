import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  leftIcon,
  rightIcon,
  variant = "filled",
  size = "md",
  disabled = false,
  fullWidth = false,
  loading = false,
  type = "button",
}) => {
  const buttonVariant = useMemo(() => {
    switch (variant) {
      case "outline":
        return "text-purple-600 bg-white border border-2 border-purple-600 hover:border-purple-400 hover:text-purple-400 disabled:text-neutral-400 disabled:border-neutral-400 disabled:hover:shadow-none disabled:shadow-none";
      case "text":
        return "text-purple-600 bg-white shadow-none hover:shadow-none hover:bg-purple-200 disabled:disabled:text-neutral-400 disabled:bg-white";
      case "danger":
        return "text-white bg-red-600 hover:bg-red-800 disabled:bg-neutral-400 disabled:hover:shadow-none disabled:shadow-none";
      default:
        return "bg-purple-600 hover:bg-purple-500 disabled:bg-neutral-400 disabled:hover:shadow-none disabled:shadow-none";
    }
  }, [variant]);

  const buttonSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-xs py-2 px-4";
      case "lg":
        return "text-sm py-3.5 px-7";
      default:
        return "text-xs py-3 px-6";
    }
  }, [size]);

  return (
    <button
      className={twMerge(
        "text-white font-bold rounded-lg px-5 py-2.5 text-center my-2 shadow-md text-sm shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 uppercase transition-all flex items-center justify-center gap-2 active:scale-95 disabled:active:scale-100",
        buttonVariant,
        buttonSize,
        fullWidth ? "w-full" : null,
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <svg
          aria-hidden="true"
          className="w-4 h-4 text-gray-200 animate-spin fill-neutral-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <>
          {leftIcon}

          <span>{children}</span>

          {rightIcon}
        </>
      )}
    </button>
  );
};
export default Button;
