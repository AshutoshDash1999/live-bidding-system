"use client";

import CustomButton from "@/components/CustomButton/CustomButton";
import { firebaseApp } from "@/utils/firebaseConfig";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Option,
    Select,
    Switch,
    Typography
} from "@material-tailwind/react";
import { collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Registration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    haveBussinessLicense: false,
    bussinessLicenseNumber: "",
    isAgreeToTnC: false,
  });

  const inputHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log("value", value);

  const data = value?.docs.map((doc) => doc.data());
  console.log("data", data);

  const submitUserData = () => {};

  return (
    <div className="flex justify-center items-center p-16">
      <Card className="w-96 md:w-4/5">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white" className="text-center">
            Account Registeration
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Select label="Select Your Role">
            <Option>Buyer</Option>
            <Option>Selller</Option>
          </Select>
          <Input
            label="Name"
            size="lg"
            value={userData?.name}
            onChange={inputHandler}
          />

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="Email"
              size="lg"
              value={userData?.email}
              onChange={inputHandler}
            />
            <Input
              label="Phone Number"
              size="lg"
              value={userData?.phoneNumber}
              onChange={inputHandler}
            />
          </div>

          <Input
            label="Adress"
            size="lg"
            value={userData?.address}
            onChange={inputHandler}
          />

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="City"
              size="lg"
              value={userData?.city}
              onChange={inputHandler}
            />
            <Input
              label="State"
              size="lg"
              value={userData?.state}
              onChange={inputHandler}
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="Zip Code"
              size="lg"
              value={userData?.zipCode}
              onChange={inputHandler}
            />
            <Input
              label="Country"
              size="lg"
              value={userData?.country}
              onChange={inputHandler}
            />
          </div>

          <Switch
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  Do you have a business license?
                </Typography>
              </div>
            }
            ripple={true}
            onChange={(e) =>
              setUserData({
                ...userData,
                haveBussinessLicense: e.target.checked,
              })
            }
          />

          {userData?.haveBussinessLicense ? (
            <Input
              label="Business License Number"
              size="lg"
              value={userData?.bussinessLicenseNumber}
              onChange={inputHandler}
            />
          ) : null}

          <div className="-ml-2.5">
            <Checkbox
              label="I agree to all Terms and Conditions"
              onChange={(e) =>
                setUserData({ ...userData, isAgreeToTnC: e.target.value })
              }
            />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <CustomButton text="Submit" loadingText="Submiting..." />
        </CardFooter>
      </Card>
    </div>
  );
};
export default Registration;
