import { FirestoreCollection } from "@/config/constants";
import { firestoreDB } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  return <div className="product-details-layout">{children}</div>;
};
export default ProductDetailsLayout;
