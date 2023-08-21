"use client";

import { firebaseApp } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { redirect } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Appbar from "../../components/Navbar/pages";
import ProductCard from "../../components/ProductCard/ProductCard";
import PublishItem from "../../components/PublishItem/PublishItem";
import useStore from "../../store/useStore";

const auth = getAuth(firebaseApp);

const Dashboard = () => {
  const { userData } = useStore();

  // check if a user is authenticated or not
  const [user, loading, error] = useAuthState(auth);

  console.log("user", user?.email);

  useEffect(() => {
    if (!user?.email) {
      redirect("/login");
    }
  }, [user]);

  console.log("userData", userData);

  const [productList, collectionLoading, collectionError] = useCollection(
    collection(getFirestore(firebaseApp), "productData"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="p-4">
      <Appbar />

      <div className="my-8">
        {userData?.role == "seller" ? <PublishItem /> : null}
      </div>

      <div className="my-8">
        {productList && (
          <span>
            {productList.docs.map((doc) => {
              const { productName, productImage, productPrice, productId } =
                doc.data();
              return (
                <Fragment key={doc.id}>
                  <ProductCard
                    productName={productName}
                    productImage={productImage}
                    price={productPrice}
                    id={productId}
                  />
                </Fragment>
              );
            })}
          </span>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
