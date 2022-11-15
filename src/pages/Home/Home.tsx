import BidderHome from "../BidderHome/BidderHome";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

function Home() {
  // const [snapshot, loading, error] = useCollection(
  //   collection(getFirestore(firebaseApp), 'hooks'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  

  let role = "seller"; //change here
  return <div>{role === "bidder" ? <BidderHome /> : <SellerDashboard />}</div>;
}

export default Home;
