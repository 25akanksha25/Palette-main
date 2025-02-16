import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleArtworkById } from "../store/artwork/artworkSlice"; // Redux action
import { toast } from "react-toastify"; // For error handling

const ArtworkDetails = () => {
  const { artworkId } = useParams(); // Get artwork ID from URL
  const dispatch = useDispatch();

  const { singleartwork: artwork, isLoading, isError, message } = useSelector((state) => state.artwork);

  useEffect(() => {
    dispatch(getSingleArtworkById(artworkId)); // Fetch the artwork
  }, [dispatch, artworkId]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error(message);
    return <p>Error loading artwork.</p>;
  }
  if (!artwork) return <p>Artwork not found.</p>;

  return (
    <div className="p-6 bg-white">
      <Link
        to="/artwork"
        className="text-black text-xl border-2 border-black px-3 py-3 rounded rounded-l-full rounded-r-full hover:bg-pink-400 hover:text-white hover:border-white"
      >
        ~ Back to Artworks
      </Link>

      <h1 className="text-5xl text-black mb-4 mt-10 font-extrabold">Artwork Details</h1>

      <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="w-full sm:w-1/2 sm:mr-6 mb-6 sm:mb-0">
          <img
            src={artwork.image}
            alt={`Artwork by ${artwork.seller?.name || "Unknown"}`}
            className="w-full object-cover rounded-lg shadow-lg"
            style={{ maxWidth: "900px", height: "800px" }}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <div className="mb-6">
            <h2 className="text-5xl font-extrabold text-black">{artwork.name}</h2>
            <h3 className="text-3xl font-semibold text-black mt-2">{artwork.seller?.fullName}</h3>
          </div>

          <p className="text-xl text-gray-600 mt-2">{artwork.description}</p>

          <div className="mt-6">
            <p className="text-xl text-black">
              <strong>Dimensions:</strong> {artwork.dimensions}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold text-black">Tags:</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full">
                {artwork.category?.name}
              </span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full">
                {artwork.location?.name}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold text-black">Rs {artwork.price}</p>
          </div>

          <button className="mt-6 bg-black text-white py-2 px-6 rounded-lg text-lg hover:bg-pink-500 w-full">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
