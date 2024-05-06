"use client";

import Input from "@/components/Input";
import { firebaseAuth, firestoreDB } from "@/config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Lottie from "lottie-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import ImagePlaceholder from "../../../../../public/image-placeholder.svg";
import notFoundLottie from "../../../../../public/lottie/not-found.json";

const ProductDetailsPage = () => {
  const params = useParams();

  const [bidAmount, setBidAmount] = useState("");

  const [user] = useIdToken(firebaseAuth);

  const [productDetails, productDetailsLoading] = useDocument(
    doc(firestoreDB, "productDetails", `${params?.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const bidAmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };

  const updateBidAmount = async () => {
    if (user?.email) {
      if (parseFloat(bidAmount) > 0) {
        if (parseFloat(bidAmount) > parseFloat(productDetails?.data()?.price)) {
          const productDetailsRef = doc(
            firestoreDB,
            "productDetails",
            `${params?.id}`
          );

          await updateDoc(productDetailsRef, {
            price: bidAmount,
            bidder: user?.email,
          });
        } else {
          toast.error("Bid with higher amount.");
        }
      } else {
        toast.error("Bid a number first");
      }
    } else {
      toast.error("Login first before bidding");
    }
  };

  // ! Test product id: 186e11d5e5ca49a0a

  // ? If product id doesnt exist
  if (!productDetailsLoading && !productDetails?.data()) {
    return (
      <div>
        <h1 className="text-center text-5xl font-bold">
          This product doesn&apos;t exist!
        </h1>
        <Lottie
          animationData={notFoundLottie}
          className="flex justify-center items-center h-96"
          loop={true}
        />
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
              className="h-full max-h-screen w-full rounded-lg object-cover shadow-md"
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
              value={bidAmount}
              onChange={bidAmountHandler}
              onButtonClick={updateBidAmount}
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
