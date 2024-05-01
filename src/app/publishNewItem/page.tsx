"use client";

import Input from "@/components/Input";
import Lottie from "lottie-react";
import { ChangeEvent, useRef, useState } from "react";

const imageUploadLottie = require("/public/lottie/image-upload.json");

const PublishItem = () => {
  const imageUploadInputRef = useRef<HTMLInputElement>(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    auctionEndingDateTime: "",
  });

  const productDetailsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Publish a New Item</h1>
      <div className="flex flex-row justify-center p-10 gap-20">
        <div className="">
          <Lottie
            animationData={imageUploadLottie}
            className="flex justify-center items-center h-96"
            loop={true}
            onClick={() => imageUploadInputRef?.current?.click()}
          />
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={imageUploadInputRef}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <Input
            label="Product Name"
            value={productDetails.name}
            name="name"
            onChange={productDetailsChangeHandler}
          />
          <Input
            label="Product Price"
            value={productDetails.price}
            name="price"
            onChange={productDetailsChangeHandler}
          />
          <Input
            label="Product Description"
            value={productDetails.description}
            name="description"
            onChange={productDetailsChangeHandler}
          />
          <Input
            label="Auction Ending at"
            inputType="datetime-local"
            value={productDetails.auctionEndingDateTime}
            name="auctionEndingDateTime"
            onChange={productDetailsChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default PublishItem;
