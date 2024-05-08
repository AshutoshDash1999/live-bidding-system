import { firebaseAuth } from "@/config/firebaseConfig";
import dayjs from "dayjs";
import { useIdToken } from "react-firebase-hooks/auth";
import { twMerge } from "tailwind-merge";

const BiddingStatus = ({
  auctionEndingDate,
  latestBidder,
}: {
  auctionEndingDate: string;
  latestBidder: string;
}) => {
  const [user] = useIdToken(firebaseAuth);

  const isAuctionOngoing = dayjs(auctionEndingDate).isAfter(dayjs());

  const isAuctionWon =
    dayjs(auctionEndingDate).isBefore(dayjs()) && user?.email === latestBidder;

  const isAuctionLost =
    dayjs(auctionEndingDate).isBefore(dayjs()) && user?.email !== latestBidder;

  return (
    <div
      className={twMerge(
        "border-2 flex justify-center rounded-lg font-extrabold  ",
        isAuctionOngoing
          ? "border-green-700 bg-green-200 text-green-700"
          : null,
        isAuctionWon ? "border-purple-700 bg-purple-200 text-purple-700" : null,
        isAuctionLost ? "border-red-700 bg-red-200 text-red-700" : null
      )}
    >
      {isAuctionOngoing ? <span>ONGOING</span> : null}

      {isAuctionWon ? <span>WON</span> : null}

      {isAuctionLost ? <span>LOST</span> : null}
    </div>
  );
};
export default BiddingStatus;
