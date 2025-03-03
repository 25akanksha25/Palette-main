import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/artworkSlice";
import { toast } from "react-toastify"; // Import toast for error handling
import backgroundImg from "../assets/artwork_header.gif";

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
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[600px]">
          <img
            src={backgroundImg}
            alt="Artwork Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="bg-white ml-6 p-6 mt-4 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="max-w-2xl text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Every piece of art tells a story—find the one that speaks to you.
            </h1>
            <p className="text-gray-600 mt-3">
              Explore a curated collection of unique artworks from talented
              creators. Whether you're looking for a masterpiece to adorn your
              walls or a statement piece to cherish, discover art that resonates
              with your soul.
            </p>
          </div>

          {user?.userType === "seller" && (
            <Link to="/create-artwork">
              <button className="mt-4 sm:mt-0 border-2 border-black px-6 py-3 rounded-xl text-lg font-semibold text-black transition-all duration-300 hover:text-white hover:bg-black">
                Upload Your Art Piece
              </button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-4 gap-6 mt-12">
          {availableArtworks.length > 0 ? (
            availableArtworks.map((artwork) => (
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
                  <h3 className="text-2xl font-bold text-black">
                    {artwork.name}
                  </h3>
                  <h3 className="text-lg font-semibold text-black">
                    {artwork.seller?.fullName || "Unknown Seller"}
                  </h3>
                  {/* <p className="text-sm text-gray-600">{artwork.description}</p> */}
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
                      Rs {artwork.price}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <Link
                    key={artwork._id}
                    to={`/single-artwork-detail/${artwork._id}`}
                  >
                    <button className="w-full text-white bg-black hover:border-2 hover:border-black rounded p-2 hover:bg-white hover:text-black">
                      Purchase
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No artworks available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtWorks;
