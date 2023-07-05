import Appbar from "@/components/Navbar/pages";
import ProductCard from "@/components/ProductCard/page";
import PublishItem from "@/components/PublishItem/page";

const page = () => {
  return (
    <div>
      <PublishItem />
      <ProductCard />
      <Appbar/>
    </div>
  );
};
export default page;
