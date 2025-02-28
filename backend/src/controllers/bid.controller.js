import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Bid from "../models/bid.model.js";
import Auction from "../models/auction.model.js";


const addBidOnItem = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json(new ApiResponse(400, "Invalid bid amount"));
    }

    console.log(amount, "amount");

    let item = await Auction.findById(req.params.id);
    if (!item) {
      return res.status(404).json(new ApiResponse(404, "Item not found"));
    }

    if (amount <= item.startingPrice) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, "Bid amount should be greater than the current bid")
        );
    }

    console.log(item, "item....");

    const newBid = new Bid({
      bidder: req.user._id,
      auction: req.params.id,
      bidAmount: amount,
    });

    await newBid.save();

    item.bids.push(newBid._id);
    item.startingPrice = amount;

    await item.save();

    return res
      .status(201)
      .json(new ApiResponse(201, "Bid placed successfully", newBid));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});


const getWinnerOfAuction = asyncHandler(async (req, res) => {
  console.log(req.params.id, "req.params.id");
  const bids = await Bid.find({ auction: req.params.id });
  console.log(bids, "auction.........");

  if (!bids) {
    return res.status(404).json(new ApiResponse(404, "Auction not found"));
  }
  if (bids.length === 0) {
    return res.status(406).json(new ApiResponse(406, "No bids found"));
  }

  //we got auction array
  //we need to get the max bid from the array
  //then we need to get the user id of the max bid
  //then we need to get the user from the user id
  //then we need to set the winner of the auction to the user
  //then we need to set the auction to over
  //then we need to save the auction

  let maxBidId = bids[0]._id;
  let maxAmount = bids[0].bidAmount;
  for (let i = 1; i < bids.length; i++) {
    if (bids[i].bidAmount > maxAmount) {
      maxAmount = bids[i].bidAmount;
      maxBidId = bids[i]._id;
    }
  }

  console.log(maxAmount, "maxAmount");
  console.log(maxBidId, "maxBid");
  const auction = await Auction.findById(req.params.id);
  const winnerUser = await Bid.findById(maxBidId).populate(
    "bidder",
    "fullName email phone profilePicture"
  );

  console.log(winnerUser, "winnerUser");

  auction.winner = maxBidId;
  auction.status = "over";

  await auction.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Winner of the auction", winnerUser));
});


const getBidsByUser = asyncHandler(async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user._id }).populate(
      "auction",
      "title description startingPrice"
    )
    .sort({ createdAt: -1 })


    console.log(bids, "bids....");
    if (!bids) {
      return res.status(404).json(new ApiResponse(404, "No bids found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "All bids by user", {bids: bids}));
    
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
    
  }

  
});


const getAllBidsByAuctionId = asyncHandler(async (req, res) => {
  try {

    const bids = await Bid.find({ auction: req.params.auctionId }).populate(
      "bidder",
      "fullName profilePicture"
    )
    .sort({ createdAt: -1 })

    if (!bids) {
      return res.status(404).json(new ApiResponse(404, "No bids found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "All bids by auction", {bids: bids}));
    
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
    
  }

  
});

//good code 
// const deleteBid = asyncHandler(async (req, res) => {
//   const { deletedUserId, auctionId } = req.params;

//   // Delete the bid
//   await Bid.deleteOne({ bidder: deletedUserId, auction: auctionId });

//   // Find the second-highest bidder
//   const secondHighestBid = await Bid.findOne({ auction: auctionId })
//       .sort({ bidAmount: -1 })  // Sort in descending order
//       .populate("bidder", "fullName");

//   let updatedWinner = null;
//   let updatedBidAmount = 0;

//   if (secondHighestBid) {
//       updatedWinner = secondHighestBid.bidder;
//       updatedBidAmount = secondHighestBid.bidAmount;
//       await Auction.findByIdAndUpdate(auctionId, { winner: updatedWinner._id });
//   } else {
//       // If no other bids exist, unset the winner field
//       await Auction.findByIdAndUpdate(auctionId, { $unset: { winner: "" } });
//   }

//   // Check if there's a valid updated winner and send notification
//   if (updatedWinner && updatedWinner._id) {
//       await notificationService.sendNewBidNotification({
//           userId: updatedWinner._id,
//           message: `${updatedWinner.fullName} won the bid with ₹${updatedBidAmount}`,
//       });
//   }

//   res.status(200).json(new ApiResponse(200, "Bid deleted, winner updated", {
//       deletedUserId,
//       newWinner: updatedWinner,
//   }));
// });

const deleteBid = asyncHandler(async (req, res) => {
  const { deletedUserId, auctionId } = req.params;

  await Bid.deleteOne({ bidder: deletedUserId, auction: auctionId });

  // Find the updated bid list after deletion
  const remainingBids = await Bid.find({ auction: auctionId })
    .sort({ bidAmount: -1 }) 
    .populate("bidder", "fullName");

  let updatedWinner = null;
  let updatedBidAmount = 0;

  if (remainingBids.length > 0) {
    updatedWinner = remainingBids[0].bidder;
    updatedBidAmount = remainingBids[0].bidAmount; 

    // Update the auction with new highest bid
    await Auction.findByIdAndUpdate(auctionId, { 
      winner: updatedWinner._id, 
      startingPrice: updatedBidAmount 
    });
  } else {
    await Auction.findByIdAndUpdate(auctionId, { 
      $unset: { winner: "" }, 
      startingPrice: 0 
    });
  }

  if (updatedWinner && updatedWinner._id) {
    await notificationService.sendNewBidNotification({
      userId: updatedWinner._id,
      message: `${updatedWinner.fullName} is now the highest bidder with ₹${updatedBidAmount}`,
    });
  }

  res.status(200).json(new ApiResponse(200, "Bid deleted, winner updated", {
    deletedUserId,
    newWinner: updatedWinner,
    newHighestBid: updatedBidAmount
  }));
});


export { 
  addBidOnItem, 
  getWinnerOfAuction,
  getBidsByUser,
  getAllBidsByAuctionId,
  deleteBid,
};


