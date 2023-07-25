"use client";

import Appbar from "../../components/Navbar/pages";
import ProductCard from "../../components/ProductCard/ProductCard";
import PublishItem from "../../components/PublishItem/PublishItem";
import useStore from "../../store/useStore";

const Dashboard = () => {
  const { userData } = useStore();

  console.log("userData", userData)

  return (
    <div className="p-4">
      <Appbar />
      <PublishItem />
      <ProductCard />
    </div>
  );
};
export default Dashboard;
