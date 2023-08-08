"use client";

import useStore from "@/store/useStore";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    Input,
    Progress,
    Spinner,
    Typography
} from "@material-tailwind/react";
import Textarea from "@material-tailwind/react/components/Textarea";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { toast, Toaster } from "react-hot-toast";
import { db, firebaseApp } from "../../utils/firebaseConfig";
import CustomButton from "../CustomButton/CustomButton";

const storage = getStorage(firebaseApp);

const PublishItem = () => {
  const { loggedInEmail } = useStore();

  const [openPublishItemForm, setOpenPublishItemForm] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    publisher: loggedInEmail,
    productBidPrice: "",
  });
  const [productImage, setProductImage] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productImageFile, setProductImageFile] = useState({
    imageFile: null,
    fileName: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploadSuccess, setIsImageUploadSuccess] = useState(false);

  const [uploadFile, uploading, snapshot, errorUploading] = useUploadFile();
  const date = new Date();

  const handleOpenPublishItemForm = () => {
    setOpenPublishItemForm((current) => !current);
  };

  const inputHandler = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  // function to convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // view selected image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size < 2185200) {
      setProductImageFile({ ...productImageFile, imageFile: file });
      const base64 = await convertToBase64(file);

      setProductImage(base64);
    } else {
      toast.error("Image size should be less than 2Mb.");
    }
  };

  // upload image to firebase storage
  const uploadProductImage = async () => {
    if (productImageFile?.imageFile) {
      const imageName = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}-${
        productImageFile?.imageFile.name
      }`;

      setProductImageFile({ ...productImageFile, fileName: imageName });

      const storageRef = ref(storage, imageName);

      const uploadResult = await uploadFile(
        storageRef,
        productImageFile?.imageFile
      );

      if (uploadResult?.metadata?.fullPath) {
        setIsImageUploadSuccess(true);
      }

      if (errorUploading) {
        setIsImageUploadSuccess(false);

        toast.error("Error", errorUploading?.message);
      }
    }
  };

  // get uploaded image url from firebase storage
  useEffect(() => {
    if (productImageFile?.fileName && isImageUploadSuccess) {
      const starsRef = ref(storage, productImageFile?.fileName);

      getDownloadURL(starsRef)
        .then((url) => {
          setProductImageUrl(url);
        })
        .catch((error) => toast.error(`${error?.title}: ${error?.message}`));
    }
  }, [isImageUploadSuccess, productImageFile?.fileName]);

  console.log("productImageUrl", productImageUrl);

  console.log("productImageFile", productImageFile);

  console.log("productData", productData);

  // upload product data to firestore
  const productDataUpload = async () => {
    const productId = crypto.randomUUID().split("-")[0];

    const payload = {
      ...productData,
      productId,
      productImage: productImageUrl,
      publishedDateTime: `${date}`,
    };

    await setDoc(doc(db, "productData", productId), payload)
      .then(() => {
        toast.success("Items published successfully");
        setProductData({
          ...productData,
          productName: "",
          productDescription: "",
          productImage: "",
          productPrice: "",
          publisher: loggedInEmail,
          productBidPrice: "",
        });
        setProductImageFile({
          ...productImageFile,
          fileName: "",
          imageFile: "",
        });
        setOpenPublishItemForm(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    try {
      productDataUpload();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [productImageUrl]);

  const handlePublishItem = async () => {
    if (
      !!productData?.productName &&
      !!productData?.productDescription &&
      !!productImageFile?.imageFile &&
      !!productData?.productPrice
    ) {
      try {
        setIsSubmitting(true);
        uploadProductImage();
      } catch (error) {
        console.log("Error", error);
        setIsSubmitting(false);
      }
    } else {
      toast.error("Incomplete Data");
    }
  };

  console.log("!!productData?.productName", !!productData?.productName);
  console.log(
    "!!productData?.productDescription",
    !!productData?.productDescription
  );
  console.log("productImageFile?.imageFile", productImageFile?.imageFile);
  console.log("!!productData?.productPrice", !!productData?.productPrice);

  return (
    <>
      <Button onClick={handleOpenPublishItemForm}>Publish Item</Button>
      <Dialog
        size="xs"
        open={openPublishItemForm}
        handler={handleOpenPublishItemForm}
        className="bg-transparent shadow-none"
      >
        <Toaster />
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Publish Item
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Product Name"
              size="lg"
              name="productName"
              value={productData?.productName}
              onChange={inputHandler}
            />
            <Textarea
              label="Product description"
              size="lg"
              name="productDescription"
              value={productData?.productDescription}
              onChange={inputHandler}
            />
            <Input
              label="Product Image"
              type="file"
              size="lg"
              name="productImage"
              onChange={(e) => handleImage(e)}
            />

            {!!productImage ? (
              <div className="flex justify-center h-32 object-contain">
                {uploading ? (
                  <div className="relative object-contain h-32">
                    <div className="absolute bottom-1/2 left-1/2">
                      <Spinner className="" />
                    </div>
                    <Image
                      src={productImage}
                      alt=""
                      width={200}
                      height={200}
                      className="rounded shadow-xl object-contain h-32 opacity-30"
                    />
                    <Progress
                      value={Math.floor(
                        (snapshot?.bytesTransferred / snapshot?.totalBytes) *
                          100
                      )}
                      className="w-100"
                      size="sm"
                      label=" "
                    />
                  </div>
                ) : (
                  <Image
                    src={productImage}
                    alt=""
                    width={200}
                    height={200}
                    className="rounded shadow-xl object-cover hover:object-contain hover:drop-shadow-xl"
                  />
                )}
              </div>
            ) : null}

            <Input
              label="Product Price"
              size="lg"
              name="productPrice"
              value={productData?.productPrice}
              onChange={inputHandler}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <CustomButton
              text="Publish Item"
              loadingText="Publishing..."
              onClick={handlePublishItem}
              loading={isSubmitting}
            />
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
export default PublishItem;
