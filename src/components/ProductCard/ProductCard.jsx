"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  productImage,
  productName,
  price,
  id,
}) {
  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-60">
        <Image
          src={productImage}
          alt="Product Image"
          width="100"
          height="100"
          className="object-cover rounded w-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            {productName}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ₹ {price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={`/product/${id}`}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
          >
            bid
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
