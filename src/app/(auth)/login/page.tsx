import Link from "next/link";

const Login = () => {
  return (
    <p className="text-center">
      New User?{" "}
      <Link href={"/signup"} className="text-purple-600">
        Signup here
      </Link>
    </p>
  );
};
export default Login;
