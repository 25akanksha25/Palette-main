// const BidCard = (bid) => {


//   return (
//     <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
//     <div className="flex gap-4 items-center text-black">
//         <img src={bid?.bid?.bidder?.profilePicture}  alt="bidder profilePicture" className="w-10 h-10 rounded-full" />
//         <div className="flex flex-col">
//             <span className="font-semibold">{bid?.bid?.bidder?.fullName}</span>
//             <span className="text-xs text-black">
//                 {new Date(bid?.bid?.bidTime).toLocaleDateString()} {""}
//                 {new Date(bid?.bid?.bidTime).toLocaleTimeString()}
//             </span>
//         </div>
//     </div>
//     <div className="text-black">Bid Amount : ₹{bid?.bid?.bidAmount}</div>
// </div> 
//   )
// }

// export default BidCard;


const BidCard = ({ bid }) => {
  const bidderExists = bid?.bidder; // Check if the bidder exists

  return (
    <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
      <div className="flex gap-4 items-center text-black">
        {/* Show placeholder if user is deleted */}
        {bidderExists ? (
          <>
            <img
              src={bid?.bidder?.profilePicture}
              alt="bidder profilePicture"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{bid?.bidder?.fullName}</span>
              <span className="text-xs text-black">
                {new Date(bid?.bidTime).toLocaleDateString()} {""}
                {new Date(bid?.bidTime).toLocaleTimeString()}
              </span>
            </div>
          </>
        ) : (
          <span className="font-semibold text-gray-500">User Deleted</span>
        )}
      </div>

      {/* Show bid details only if the user exists */}
      {bidderExists ? (
        <div className="text-black">Bid Amount: ₹{bid?.bidAmount}</div>
      ) : (
        <div className="text-gray-500">Bid Removed</div>
      )}
    </div>
  );
};

export default BidCard;