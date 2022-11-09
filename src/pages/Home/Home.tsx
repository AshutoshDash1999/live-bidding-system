import React from 'react'
import BidderHome from '../BidderHome/BidderHome'
import SellerDashboard from '../SellerDashboard/SellerDashboard'
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';

function Home() {
  // const [snapshot, loading, error] = useCollection(
  //   collection(getFirestore(firebaseApp), 'hooks'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

    let role = "seller"  
  return (
    <div>
        {
            role==="bidder"?<BidderHome/>:<SellerDashboard/>
        }
    </div>
  )
}

export default Home