"use client";

import { FirestoreCollection } from "@/config/constants";
import { firebaseAuth, firestoreDB } from "@/config/firebaseConfig";
import { doc } from "firebase/firestore";
import React from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
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
      <h1 className="font-bold text-3xl">Bidding History</h1>

      {biddingHistoryListLatest.map((biddingData, index) => {
        return (
          <React.Fragment key={index}>
            <ProductBiddingHistoryCard biddingData={biddingData} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default BiddingHistory;
