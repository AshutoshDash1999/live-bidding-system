"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { firebaseStorage, firestoreDB } from "@/config/firebaseConfig";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import Lottie from "lottie-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

const imageUploadLottie = require("/public/lottie/image-upload.json");

const PublishItem = () => {
  const imageUploadInputRef = useRef<HTMLInputElement>(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    auctionEndingDateTime: "",
  });
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const productID = crypto.randomUUID().replaceAll("-", "").slice(0, 17);

  const productDetailsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const selectedImageRemoveHandler = () => {
    setSelectedImage(null);
  };

  const uploadImageHandler = () => {
    if (!selectedImage) {
      imageUploadInputRef?.current?.click();
    }
  };

  const selectImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e?.target?.files[0]?.size < 2185200) {
      setSelectedImage(e?.target?.files[0]);
    } else {
      toast.error("Image size should be less than 2MB!");
    }
  };

  const productDetailsSubmitHandler = async () => {
    try {
      setIsButtonLoading(true);

      const productImageRef = storageRef(
        firebaseStorage,
        `productImage/${selectedImage?.name.trim().replaceAll(" ", "_")}`
      );

      // Wrap the upload and URL retrieval in a Promise to ensure sequential execution
      const productImageURLPromise = new Promise((resolve, reject) => {
        uploadBytes(productImageRef, selectedImage)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              resolve(url); // Resolve the promise with the URL
            });
          })
          .catch((error) => {
            toast.error(`Upload failed: ${error?.message}`);
            reject(error); // Reject the promise if there's an error
          });
      });

      // Await the URL retrieval promise before proceeding
      const productImageURL = await productImageURLPromise;

      await setDoc(doc(firestoreDB, "productDetails", productID), {
        ...productDetails,
        productImageURL,
      });
    } catch (error: any) {
      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Publish a New Item</h1>
      <div className="flex flex-row justify-center p-10 gap-20">
        <div className="">
          <div onClick={uploadImageHandler} className="p-4 cursor-pointer">
            {selectedImage ? (
              <div className=" relative">
                <XCircleIcon
                  className="h-10 absolute text-purple-600 bg-[#ffffffaa] p-1 m-1 rounded-full right-0"
                  onClick={selectedImageRemoveHandler}
                />
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                  width={300}
                  height={100}
                  className="h-96 rounded-lg"
                />
              </div>
            ) : (
              <Lottie
                animationData={imageUploadLottie}
                className="flex justify-center items-center h-96"
                loop={true}
              />
            )}
          </div>

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={imageUploadInputRef}
            onChange={selectImageHandler}
            hidden
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

          <Button
            onClick={productDetailsSubmitHandler}
            loading={isButtonLoading}
          >
            Publish Item
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PublishItem;
