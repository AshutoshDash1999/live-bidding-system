"use client";

import Input from "@/components/Input";
import Lottie from "lottie-react";
import { useRef } from "react";
import imageUploadLottie from "/public/lottie/image-upload.json";

const PublishItem = () => {
  const imageUploadInputRef = useRef<HTMLInputElement>(null);
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
          <Input label="Product Name" />
          <Input label="Product Price" />
          <Input label="Product Description" />
          <Input label="Auction Ending at" inputType="datetime-local" />
        </div>
      </div>
    </div>
  );
};
export default PublishItem;
