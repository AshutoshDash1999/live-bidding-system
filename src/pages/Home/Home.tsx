import React from 'react'
import BidderHome from '../BidderHome/BidderHome'
import SellerDashboard from '../SellerDashboard/SellerDashboard'

function Home() {
    let role = "bidder"
  return (
    <div>
        {
            role==="bidder"?<BidderHome/>:<SellerDashboard/>
        }
    </div>
  )
}

export default Home