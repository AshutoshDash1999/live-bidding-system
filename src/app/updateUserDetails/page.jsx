"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography
} from "@material-tailwind/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { toast, Toaster } from "react-hot-toast";
import CustomButton from "../../components/CustomButton/CustomButton";
import CountriesInfo from "../../utils/country_dial_info.json";
import { db, firebaseApp } from "../../utils/firebaseConfig";

const UpdateUserDetails = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [country, setCountry] = useState(0);

  const { flag, dial_code } = CountriesInfo[country];

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebaseApp), "userData", "ashu@mail.com"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log("value", value?.data());

  useEffect(() => {
    if (value) {
      setUserData(value?.data());
    }
  }, [value]);

  const inputHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  console.log("userData", userData);

  const submitUserData = async () => {
    try {
      setIsSubmitting(true);
      await setDoc(doc(db, "userData", userData?.email), userData)
        .then(() => {
          toast.success("Account details updated successfully");
        })
        .catch(() => {
          toast.error(error?.message);
        });
    } catch (er) {
      console.log("Error", er);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-16">
      <Toaster />

      <Card className="w-96 md:w-4/5">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white" className="text-center">
            Account Details Update
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Name"
            size="lg"
            defaultValue={userData?.name}
            onChange={inputHandler}
            name="name"
          />

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="Email"
              size="lg"
              defaultValue={userData?.email}
              onChange={inputHandler}
              name="email"
              disabled
            />

            <div className="relative flex w-full">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    {flag} {dial_code}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {CountriesInfo.map(({ name, flag, dial_code }, index) => {
                    return (
                      <MenuItem
                        key={name}
                        value={name}
                        className="flex items-center gap-2"
                        onClick={() => setCountry(index)}
                      >
                        {flag} {name}
                        <span className="ml-auto">{dial_code}</span>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              <Input
                type="tel"
                placeholder="Mobile Number"
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                defaultValue={userData?.phoneNumber}
                onChange={inputHandler}
                name="phoneNumber"
              />
            </div>
          </div>

          <Input
            label="Adress"
            size="lg"
            defaultValue={userData?.address}
            onChange={inputHandler}
            name="address"
          />

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="City"
              size="lg"
              defaultValue={userData?.city}
              onChange={inputHandler}
              name="city"
            />
            <Input
              label="State"
              size="lg"
              defaultValue={userData?.state}
              onChange={inputHandler}
              name="state"
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <Input
              label="Zip Code"
              size="lg"
              defaultValue={userData?.zipCode}
              onChange={inputHandler}
              name="zipCode"
            />
            <Input
              label="Country"
              size="lg"
              defaultValue={userData?.country}
              onChange={inputHandler}
              name="country"
            />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <CustomButton
            text="Update"
            loadingText="Updating..."
            onClick={submitUserData}
            loading={isSubmitting}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
export default UpdateUserDetails;
