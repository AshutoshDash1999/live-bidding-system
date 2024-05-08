import BiddingStatus from "@/components/BiddingStatus";
import { FirestoreCollection } from "@/config/constants";
import { firestoreDB } from "@/config/firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useDocument } from "react-firebase-hooks/firestore";

dayjs.extend(relativeTime);

const ProductBiddingHistoryCard = ({
  biddingData,
}: {
  biddingData: {
    productId: string;
    bidAmount: string;
  };
}) => {
  const [productDetails, productDetailsLoading] = useDocument(
    doc(
      firestoreDB,
      FirestoreCollection.productDetails,
      `${biddingData?.productId}`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (productDetailsLoading) {
    return (
      <div className="h-28 mb-4 rounded-lg animate-pulse bg-neutral-300"></div>
    );
  }

  return (
    <Link href={`product/${biddingData?.productId}`}>
      <div className="mb-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex gap-8 p-2">
        <Image
          src={productDetails?.data()?.productImageURL}
          alt={productDetails?.data()?.name}
          height={300}
          width={150}
          className="rounded-lg h-24 w-24 object-cover"
        />
        <div className="flex gap-8 justify-between flex-1">
          <div>
            <h3 className="font-bold text-4xl">
              {productDetails?.data()?.name}
            </h3>
            <h4 className="text-lg">
              Current price:{" "}
              <span className="font-bold">
                ₹ {productDetails?.data()?.price}
              </span>
            </h4>
            <h2 className="text-lg">
              Auction ending{" "}
              <span className="font-bold">
                {dayjs(
                  productDetails?.data()?.auctionEndingDateTime
                )?.fromNow()}
                .
              </span>
            </h2>
          </div>
          <div>
            <BiddingStatus
              auctionEndingDate={productDetails?.data()?.auctionEndingDateTime}
              latestBidder={productDetails?.data()?.bidder}
            />
            <h4 className="text-lg">Your bid:</h4>
            <h2 className="font-bold text-4xl">₹ {biddingData?.bidAmount}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductBiddingHistoryCard;
