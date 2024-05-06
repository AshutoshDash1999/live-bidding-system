"use client";

import Button from "@/components/Button";
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
      <Button onClick={() => router.push("/publishNewItem")} className="mb-10">
        Publish Item
      </Button>

      {productListLoading ? (
        <div className="animate-pulse grid grid-cols-4 gap-8">
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
        <div className=" grid grid-cols-4 gap-8">
          {productList?.docs.map((doc) => {
            return (
              <div
                key={doc?.id}
                className="rounded-lg shadow-md cursor-pointer"
              >
                <Image
                  src={doc?.data()?.productImageURL}
                  alt=""
                  width={350}
                  height={200}
                  className="rounded-xl object-cover h-96 w-96"
                />
                <div className=" gap-4 p-4">
                  <h2 className="break-all text-4xl font-semibold">
                    {doc?.data()?.name}
                  </h2>
                  <h3 className="text-xl font-bold">₹ {doc?.data()?.price}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Home;
