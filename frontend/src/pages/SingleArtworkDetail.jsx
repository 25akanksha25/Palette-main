import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleArtworkById } from "../store/artwork/artworkSlice"; // Redux action
import { toast } from "react-toastify"; // For error handling

const SingleArtworkDetail = () => {
  const { id } = useParams(); // Get artwork ID from URL
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logInUser = JSON.parse(localStorage.getItem("user"));
  const {
    singleartwork: artwork,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.artwork);

  useEffect(() => {
    dispatch(getSingleArtworkById(id)); // Fetch the artwork
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error(message || "Error loading artwork.");
    return <p>Error loading artwork.</p>;
  }
  if (!artwork) return <p>Artwork not found.</p>;

  

  // Razorpay payment function
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_HA0dblFvRuSZ2X",
      amount: artwork.price * 100,
      currency: "INR",
      name: artwork.name,
      description: `Purchase ${artwork.name}`,
      image: artwork.image[0] || "",
      handler: async function (response) {

        console.log("Razorpay Response:", response); // Debugging
        if (!response.razorpay_payment_id) {
          toast.error("Payment failed. Please try again.");
          return;
        }
        try {
          const res = await fetch(`http://localhost:8010/api/v1/artwork/purchase/${artwork._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              userId: logInUser._id,
            }),
          });
  
          const data = await res.json();
          console.log("Purchase Response:", data); // Debugging
          console.log("Received Token:", req.headers.authorization);


          if (data.success) {
            toast.success("Payment successful! Artwork marked as purchased.");
            dispatch(getSingleArtworkById(id)); // Refresh the artwork details after purchase
          } else {
            toast.error(data.message || "Payment verification failed. Try again.");
          }
        } catch (error) {
          toast.error("Error processing payment. Try again.");
          console.log(error);
        }
      },
      prefill: {
        name: logInUser?.fullName,
        email: logInUser?.email,
        contact: logInUser?.phone,
      },
      theme: { color: "#121212" },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();  
  };

  return (
    <div className="p-6 bg-white">
      {user?.userType === "seller" && (
        <Link to='/artwork'>
          <button className="p-2 text-xl rounded-full border-2 border-black hover:text-white hover:bg-black">Back to artwork</button>
        </Link>
      )}
      <h1 className="text-5xl text-black mb-4 mt-10 font-extrabold">Artwork Details</h1>

      <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        {/* Artwork Image Carousel */}
        <div className="w-full sm:w-1/2 sm:mr-6 mb-6 sm:mb-0">
          {artwork.image && artwork.image.length > 0 ? (
            <img
              src={artwork.image[0]} // Show the first image
              alt={`Artwork by ${artwork.seller?.fullName || "Unknown"}`}
              className="w-full object-cover rounded-lg shadow-lg"
              style={{ maxWidth: "auto", height: "550px" }}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>

        {/* Artwork Details */}
        <div className="w-full sm:w-1/2">
          <div className="mb-6 ">
            <h2 className="text-5xl font-extrabold text-black">{artwork.name}</h2>
            <h3 className="text-3xl font-semibold text-gray-900 mt-2">
              {artwork.seller?.fullName || "Unknown Seller"}
            </h3>
          </div>

          <p className="text-xl text-gray-600 p-2 mt-2">{artwork.description}</p>

          <div className="mt-6">
            <p className="text-xl text-black mb-2">
              <strong>Dimensions:</strong>
              <p>Width: {artwork.width} cm</p>
              <p>Height: {artwork.height} cm</p>
              <p>Depth: {artwork.depth || "N/A"} cm</p>
            </p>
          </div>

          <div className="mt-6 flex">
            <p className="text-xl font-semibold text-black">Tags:</p>
            <div className="flex gap-2 ml-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-2 text-md rounded-full">
                {artwork.category?.name || "No Category"}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-2 text-md rounded-full">
                {artwork.location?.name || "No Location"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold text-black">Rs {artwork.price}</p>
          </div>

          {/* Purchase Button */}
          {logInUser ? (
            logInUser._id !== artwork?.seller?._id &&
            logInUser.userType !== "admin" &&
            logInUser.userType !== "seller" &&
            artwork.status === "available" ? (
              <button
                onClick={handlePayment}
                className="mt-6 bg-black text-white py-2 px-6 rounded-lg text-lg hover:bg-pink-500 w-full"
              >
                Purchase
              </button>
            ) : artwork.status === "paid" || artwork.status === "sold" ? (
              <p className="mt-6 text-red-500 text-lg font-semibold">
                This artwork is no longer available.
              </p>
            ) : null
          ) : (
            <Link to="/login">
              <button className="mt-6 bg-black text-white py-3 px-6 rounded-lg text-lg hover:bg-pink-500 w-full">
                Login to Purchase
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleArtworkDetail;




