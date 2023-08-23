const utililtyFunctions = {
  ifValidBidAmount: (bidAmount, lastBidAmount, sellerAmount) => {
    if (bidAmount > sellerAmount) {
      if (bidAmount > lastBidAmount) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};

export default utililtyFunctions;
