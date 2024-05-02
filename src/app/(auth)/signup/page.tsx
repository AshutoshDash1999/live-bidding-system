import Link from "next/link";

const Signup = () => {
  return (
    <p className="text-center">
      Already have an account?{" "}
      <Link href={"/login"} className="text-purple-600">
        Login here
      </Link>
    </p>
  );
};
export default Signup;
