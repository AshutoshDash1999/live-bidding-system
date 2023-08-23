"use client";

import { db, firebaseApp } from "@/utils/firebaseConfig";
import { Button, Input } from "@material-tailwind/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Appbar from "../../../components/Navbar/pages";
import utililtyFunctions from "../../../utils/functions";

const auth = getAuth(firebaseApp);

const ProductPage = ({ params }) => {
  // check if a user is authenticated or not
  const [authUser, loading, error] = useAuthState(auth);

  const [bidAmount, setBidAmount] = useState("");

  const { ifValidBidAmount } = utililtyFunctions;

  useEffect(() => {
    if (!authUser?.email) {
      redirect("/login");
    }
  }, [authUser]);

  const [productData, productLoading, productError] = useDocument(
    doc(getFirestore(firebaseApp), "productData", params?.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log("product data:", productData?.data());

  const bidHandler = () => {
    if (
      ifValidBidAmount(
        parseFloat(bidAmount),
        productData?.data()?.productBidPrice,
        productData?.data()?.productPrice
      )
    ) {
      try {
        const docRef = doc(db, "productData", params?.id);
        updateDoc(docRef, {
          productBidPrice: bidAmount,
        })
          .then(() => {
            console.log("Field updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating field: ", error);
          });
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("unsuccess");
    }
  };

  //   const {productName, productDescription, productImage, productPrice, publishedDateTime} = productData?.data()

  return (
    <div className="p-4">
      <Appbar />
      <div className="grid grid-cols-12 gap-8 w-full p-4 mt-16">
        <div className="col-span-6 flex justify-center">
          <Image
            src={productData?.data()?.productImage}
            alt={``}
            height={300}
            width={500}
            className="h-96 rounded-md shadow-md object-cover"
          />
        </div>
        <div className="col-span-6 flex flex-col gap-3">
          <h4 className="font-semibold text-gray-500">
            Product Id: {params?.id}
          </h4>
          <h3 className="text-4xl font-bold">
            {productData?.data()?.productName}
          </h3>
          <div className="grid grid-cols-2 gap-8 w-3/4">
            <div className="text-2xl font-bold p-4 rounded-lg shadow shadow-purple-100 hover:shadow-md hover:shadow-purple-400 transition duration-300 ease-in-out">
              <h2>₹ {productData?.data()?.productBidPrice}</h2>
              <span className="text-xl font-medium text-gray-600">
                (Latest Bid Price)
              </span>
            </div>
            <div className="text-2xl font-bold border p-4 rounded-lg shadow shadow-green-100 hover:shadow-md hover:shadow-green-400 transition duration-300 ease-in-out bg-">
              <h2>₹ {productData?.data()?.productPrice}</h2>
              <span className="text-xl font-medium text-gray-600">
                (Seller&apos; Price)
              </span>
            </div>
          </div>

          <div className="relative flex w-full max-w-[24rem] my-8">
            <Input
              type="text"
              label="Enter your bidding amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              // color={email ? "blue" : "blue-gray"}
              // disabled={!email}
              className="!absolute right-1 top-1 rounded"
              onClick={bidHandler}
            >
              Bid
            </Button>
          </div>

          <p className="text-gray-800 text-justify">
            {productData?.data()?.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
