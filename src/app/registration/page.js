"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Option,
    Select,
    Switch,
    Typography
} from "@material-tailwind/react";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import CustomButton from "../../components/CustomButton/CustomButton";
import CountriesInfo from "../../utils/country_dial_info.json";
import { db } from "../../utils/firebaseConfig";

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
    role: "buyer",
  });

  console.log("userData", userData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [country, setCountry] = useState(0);

  const { flag, dial_code } = CountriesInfo[country];

  const inputHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submitUserData = async () => {
    try {
      setIsSubmitting(true);
      await setDoc(doc(db, "userData", userData?.email), userData)
        .then(() => {
          toast.success("Account created successfully");
          router.push("/dashboard");
        })
        .catch(() => {
          toast.error(error?.message);
        });
    } catch (error) {
      console.log("Error", error);
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
            Account Registeration
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Select
            label="Select Your Role"
            onChange={(e) => setUserData({ ...userData, role: e })}
            name="role"
            value={userData?.role}
          >
            <Option value="buyer">Buyer</Option>
            <Option value="seller">Selller</Option>
          </Select>
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
              name="bussinessLicenseNumber"
            />
          ) : null}
        </CardBody>

        <CardFooter className="pt-0">
          <CustomButton
            text="Submit"
            loadingText="Submiting..."
            onClick={submitUserData}
            loading={isSubmitting}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
export default Registration;
