import Link from "next/link";
import Appbar from "../../components/Navbar/pages";
import ProductCard from "../../components/ProductCard/ProductCard";
import PublishItem from "../../components/PublishItem/PublishItem";

const page = () => {
  return (
    <div className="p-4">
      <Appbar />
      <PublishItem />
      <ProductCard />
    </div>
  );
};
export default page;
