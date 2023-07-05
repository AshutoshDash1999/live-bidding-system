"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Dialog,
    Input,
    Typography
} from "@material-tailwind/react";
import { useState } from "react";

const PublishItem = () => {
  const [openPublishItemForm, setOpenPublishItemForm] = useState(false);
  const handleOpenPublishItemForm = () => {
    setOpenPublishItemForm((current) => !current);
  };
  return (
    <>
      <Button onClick={handleOpenPublishItemForm}>Publish Item</Button>
      <Dialog
        size="xs"
        open={openPublishItemForm}
        handler={handleOpenPublishItemForm}
        className="bg-transparent shadow-none"
      >
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
            <Input label="Product Name" size="lg" />
            <Input label="Product description" size="lg" />
            <Input label="Product Image" type="file" size="lg" />
            <Input label="Product Price" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleOpenPublishItemForm}
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={handleOpenPublishItemForm}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
export default PublishItem;
