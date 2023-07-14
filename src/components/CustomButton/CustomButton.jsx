import { Button, Spinner } from "@material-tailwind/react";

const CustomButton = ({ loading, text, loadingText, type, onClick }) => {
  return (
    <>
      {loading ? (
        <Button
          variant="gradient"
          fullWidth
          type={type}
          disabled={loading}
          className="flex items-center justify-center gap-4"
        >
          {loadingText}
          <Spinner className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="gradient" fullWidth type={type} onClick={onClick}>
          {text}
        </Button>
      )}
    </>
  );
};
export default CustomButton;
