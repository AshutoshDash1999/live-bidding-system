"use client";

import { firebaseApp } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Appbar from "../../components/Navbar/pages";
import ProductCard from "../../components/ProductCard/ProductCard";
import PublishItem from "../../components/PublishItem/PublishItem";
import useStore from "../../store/useStore";

const auth = getAuth(firebaseApp);

const Dashboard = () => {
  const { userData } = useStore();

  // check if a user is authenticated or not
  const [user, loading, error] = useAuthState(auth);

  console.log("user", user?.email);

  useEffect(() => {
    if (!user?.email) {
      redirect("/login");
    }
  }, [user]);

  console.log("userData", userData);

  return (
    <div className="p-4">
      <Appbar />
      <PublishItem />
      <ProductCard />
    </div>
  );
};
export default Dashboard;
