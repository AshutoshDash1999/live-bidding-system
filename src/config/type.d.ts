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
  disabled?: boolean;
}

interface ButtonProps {
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  onClick: () => void;
  variant?: "filled" | "outline" | "text" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
