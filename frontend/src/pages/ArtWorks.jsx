import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/artworkSlice";
import { toast } from "react-toastify"; // Import toast for error handling

const ArtWorks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [artworkData, setArtworkData] = useState([]);
  const { artwork, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.artwork
  );

  useEffect(() => {
    dispatch(getAllArtworks()); // Fetch all artworks when component loads
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && Array.isArray(artwork)) {
      setArtworkData(artwork);
    } else if (isError) {
      toast.error(message);
    }
  }, [artwork, isSuccess, isError, message]);

  // Ensure artworks are filtered correctly
  const availableArtworks = Array.isArray(artworkData)
    ? artworkData.filter((art) => art.status !== "sold")
    : [];

  return (
    <div className="bg-white ml-6 p-6 min-h-screen">
      <div>
        <h1>Header img</h1>
      </div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl text-black">Collect Art</h1>
        {user?.userType === "seller" && (
          <Link to="/create-artwork">
            <button className="border-2 border-black p-3 rounded-xl text-lg text-black hover:text-white hover:bg-black">
              Upload Art Piece
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6 mt-12">
        {availableArtworks.length > 0 ? (
          availableArtworks.map((artwork) => (
            <Link key={artwork._id} to={`/artwork/${artwork._id}`}>
              <div className="bg-gray-100 p-2 rounded-lg shadow-lg">
                <div className="relative">
                  <img
                    src={artwork.image}
                    alt={`Artwork by ${artwork.seller?.name || "Unknown"}`}
                    className="w-full object-cover rounded-lg"
                    style={{ aspectRatio: "1 / 1", height: "auto" }}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-black">
                    {artwork.seller?.fullName || "Unknown Seller"}
                  </h3>
                  <p className="text-sm text-gray-600">{artwork.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full">
                      {artwork.category?.name}
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full">
                      {artwork.location?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-lg text-black mt-4 font-bold">
                      Rs{artwork.price}
                    </p>
                    <button className="border-2 border-black rounded p-2 text-black hover:bg-black hover:text-white">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No artworks available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtWorks;
