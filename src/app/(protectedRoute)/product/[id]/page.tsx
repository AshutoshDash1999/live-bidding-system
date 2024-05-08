"use client";

// TODO this page should be publicly available

import Input from "@/components/Input";
import { regex } from "@/config/constants";
import { firebaseAuth, firestoreDB } from "@/config/firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

dayjs.extend(relativeTime);

const ProductDetailsPage = () => {
  const params = useParams();

  const [bidAmount, setBidAmount] = useState<string>("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [user] = useIdToken(firebaseAuth);

  // fetch product details
  const [productDetails, productDetailsLoading] = useDocument(
    doc(firestoreDB, "productDetails", `${params?.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // fetch user details
  const [userDetails] = useDocument(
    doc(firestoreDB, "userData", `${user?.email}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const bidAmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex.number.test(e.target.value) || e.target.value === "") {
      setBidAmount(e.target.value);
    }
  };

  const updateBidAmount = async () => {
    try {
      setIsButtonLoading(true);

      if (user?.email) {
        if (parseFloat(bidAmount) > 0) {
          if (
            parseFloat(bidAmount) > parseFloat(productDetails?.data()?.price)
          ) {
            const productDetailsRef = doc(
              firestoreDB,
              "productDetails",
              `${params?.id}`
            );

            // update product latest bid
            await updateDoc(productDetailsRef, {
              price: bidAmount,
              bidder: user?.email,
            });

            // add product to user's bidding history
            const userDetailsRef = doc(
              firestoreDB,
              "userData",
              `${user?.email}`
            );

            await updateDoc(userDetailsRef, {
              biddingHistory: [
                ...userDetails?.data()?.biddingHistory,
                {
                  productId: params?.id,
                  bidAmount,
                },
              ],
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
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsButtonLoading(false);
      setBidAmount("");
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
              className="h-full max-h-96 w-full max-w-2xl rounded-lg object-cover shadow-md"
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

            {dayjs().isAfter(
              dayjs(productDetails?.data()?.auctionEndingDateTime)
            ) ? (
              <h3 className="text-5xl text-neutral-500 font-bold">
                Auction has expired!
              </h3>
            ) : (
              <>
                <Input
                  label="Place your bid here"
                  variant="input-with-button"
                  leftIcon={"₹"}
                  value={bidAmount}
                  onChange={bidAmountHandler}
                  onButtonClick={updateBidAmount}
                  buttonLoading={isButtonLoading}
                />

                <h2>
                  Auction ending{" "}
                  <span className="font-bold">
                    {dayjs(
                      productDetails?.data()?.auctionEndingDateTime
                    )?.fromNow()}
                    .
                  </span>
                </h2>
              </>
            )}

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
