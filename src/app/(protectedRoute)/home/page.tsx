"use client";

import BiddingStatus from "@/components/BiddingStatus";
import { firestoreDB } from "@/config/firebaseConfig";
import { collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

const Home = () => {
  const router = useRouter();

  const [productList, productListLoading, productListError] = useCollection(
    collection(firestoreDB, "productDetails"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {productListLoading ? (
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return (
              <div
                className="h-96 rounded-lg bg-neutral-300 shadow-md"
                key={item}
              ></div>
            );
          })}
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList?.docs.map((product) => {
            return (
              <div
                key={product?.id}
                className="rounded-lg shadow-md cursor-pointer"
                onClick={() => router.push(`product/${product?.id}`)}
              >
                <Image
                  src={product?.data()?.productImageURL}
                  alt={product?.data()?.name}
                  width={350}
                  height={200}
                  className="rounded-xl object-cover h-96 w-full"
                />
                <div className="flex justify-between items-center gap-4 p-4 flex-col sm:flex-row">
                  <div className="flex flex-row items-center sm:items-start justify-between w-full sm:flex-col">
                    <h2 className="break-all text-4xl font-semibold">
                      {product?.data()?.name}
                    </h2>
                    <h3 className="text-xl font-bold">
                      ₹ {product?.data()?.price}
                    </h3>
                  </div>
                  <BiddingStatus
                    auctionEndingDate={product?.data()?.auctionEndingDateTime}
                    latestBidder={product?.data()?.bidder}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* In case there are no products  */}
      {!productListLoading && productList?.docs.length === 0 ? (
        <h2 className="text-center font-bold text-3xl text-neutral-500">
          There are no products to show.
        </h2>
      ) : null}
    </div>
  );
};
export default Home;
