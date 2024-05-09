import Navbar from "@/components/Navbar";
import { FirestoreCollection } from "@/config/constants";
import { firestoreDB } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const productID = params?.id;

  // fetch product data
  const productRef = doc(
    firestoreDB,
    FirestoreCollection.productDetails,
    productID
  );
  const productSnap = await getDoc(productRef);
  const productData = productSnap?.data();

  return {
    title: productData?.name,
    description: productData?.description,
    openGraph: {
      images: [productData?.productImageURL],
    },
  };
}

const ProductDetailsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="product-details-layout p-8">{children}</div>;
    </>
  );
};
export default ProductDetailsLayout;
