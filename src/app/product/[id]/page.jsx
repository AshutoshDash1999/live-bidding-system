"use client";

import { firebaseApp } from "@/utils/firebaseConfig";
import { Button, Input } from "@material-tailwind/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Appbar from "../../../components/Navbar/pages";

const auth = getAuth(firebaseApp);

const ProductPage = ({ params }) => {
  // check if a user is authenticated or not
  const [authUser, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!authUser?.email) {
      redirect("/login");
    }
  }, [authUser]);

  const [productData, productLoading, productError] = useDocument(
    doc(getFirestore(firebaseApp), "productData",  params?.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  
  console.log("product data:", productData?.data())

//   const {productName, productDescription, productImage, productPrice, publishedDateTime} = productData?.data()

  return (
    <div className="p-4">
      <Appbar />
      <div className="grid grid-cols-12 w-full p-4 mt-16">
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
            Product Id: { params?.id}
          </h4>
          <h3 className="text-4xl font-bold">{productData?.data()?.productName}</h3>
          <div className="grid grid-cols-2 gap-8 w-3/4">
            <div className="text-2xl font-bold p-4 rounded-lg shadow shadow-purple-100 hover:shadow-md hover:shadow-purple-400 transition duration-300 ease-in-out">
              <h2>₹ 12323</h2>
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
          <div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type="text"
                label="Enter your bidding amount"
                // value={email}
                // onChange={onChange}
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
              >
                Bid
              </Button>
            </div>
          </div>
          <p className="text-gray-800 text-justify mt-12">
            {productData?.data()?.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
