"use client";

import Input from "@/components/Input";
import { firestoreDB } from "@/config/firebaseConfig";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";
import ImagePlaceholder from "../../../../../public/image-placeholder.svg";

const ProductDetailsPage = () => {
  const params = useParams();

  const [productDetails, productDetailsLoading] = useDocument(
    doc(firestoreDB, "productDetails", `${params?.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log("productDetails", !productDetails?.data());
  console.log("productDetailsLoading", !productDetailsLoading);
  console.log(!productDetailsLoading && !productDetails);

  // ! Test product id: 186e11d5e5ca49a0a

  if (!productDetailsLoading && !productDetails?.data()) {
    return (
      <div>
        <h1 className="text-center text-5xl font-bold">
          This product doesn&apos;t exist!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex space-x-10 justify-center">
      {productDetailsLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-lg bg-neutral-300 h-96 w-96"></div>
          <div className="flex flex-col space-y-8">
            <div className="rounded-lg bg-neutral-300 h-8 w-96"></div>
            <div className="rounded-lg bg-neutral-300 h-6 w-96"></div>
            <div className="rounded-lg bg-neutral-300 h-12 w-96"></div>
            <div className="rounded-lg bg-neutral-300 h-4 w-96"></div>
            <div className="rounded-lg bg-neutral-300 h-8 w-96"></div>
            <div className="rounded-lg bg-neutral-300 h-16 w-96"></div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Image
              src={
                productDetails?.data()?.productImageURL
                  ? productDetails?.data()?.productImageURL
                  : ImagePlaceholder
              }
              alt=""
              height={400}
              width={600}
              className="h-full max-h-screen w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">
              {productDetails?.data()?.name}
            </h1>

            <h3 className="text-2xl">
              Latest Bid Price:{" "}
              <span className="font-bold">
                ₹ {productDetails?.data()?.price}
              </span>
            </h3>

            <Input
              label="Place your bid here"
              variant="input-with-button"
              leftIcon={"₹"}
            />

            <h2>
              Auction ends at: {productDetails?.data()?.auctionEndingDateTime}
            </h2>

            <div>
              <h3 className="font-bold text-2xl">Description</h3>
              <p>{productDetails?.data()?.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductDetailsPage;
