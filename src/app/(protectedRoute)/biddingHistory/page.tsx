"use client";

import { FirestoreCollection } from "@/config/constants";
import { firebaseAuth, firestoreDB } from "@/config/firebaseConfig";
import { doc } from "firebase/firestore";
import Lottie from "lottie-react";
import React from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import LoadingLottie from "../../../../public/lottie/loading.json";
import ProductBiddingHistoryCard from "./ProductBiddingHistoryCard";

const BiddingHistory = () => {
  const [user] = useIdToken(firebaseAuth);
  // fetch user details
  const [userDetails, userDetailsLoading] = useDocument(
    doc(firestoreDB, FirestoreCollection.userDetails, `${user?.email}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const biddingHistoryListLatest =
    !!userDetails?.data() && userDetails?.data()?.biddingHistory.length > 0
      ? [...userDetails?.data()?.biddingHistory].reverse()
      : [];

  return (
    <div>
      {userDetailsLoading ? (
        <div className="h-11/12 flex items-center justify-center">
          <Lottie
            animationData={LoadingLottie}
            className="flex justify-center items-center h-96"
            loop={true}
          />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-3xl mb-4">Bidding History</h1>

          {biddingHistoryListLatest.map((biddingData, index) => {
            return (
              <React.Fragment key={index}>
                <ProductBiddingHistoryCard biddingData={biddingData} />
              </React.Fragment>
            );
          })}
        </>
      )}
    </div>
  );
};
export default BiddingHistory;
