interface InputProps {
  label?: string;
  inputType?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "file"
    | "checkbox"
    | "radio"
    | "submit"
    | "button"
    | "reset"
    | "hidden"
    | "color"
    | "search"
    | "tel"
    | "url"
    | "datetime-local"
    | "month"
    | "week";
  placeholder?: string;
  value: string;
  onChange: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}
