import React from 'react';
import { useParams, Link } from 'react-router-dom';



const ArtworkDetails = () => {
  const { artworkId } = useParams();
  const artwork = artworks.find((art) => art.id === parseInt(artworkId));

  if (!artwork) return <p>Artwork not found.</p>;

  return (
    <div className="p-6 bg-white">
      <Link to="/artwork" className="text-black text-xl border-2 border-black px-3 py-3 rounded rounded-l-full rounded-r-full hover:bg-pink-400 hover:text-white hover:border-white"> ~ Back to Artworks </Link>

      <h1 className="text-5xl text-black mb-4 mt-10 font-extrabold">Artwork Details</h1>
      
      <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="w-full sm:w-1/2 sm:mr-6 mb-6 sm:mb-0">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full object-cover rounded-lg shadow-lg"
            style={{ maxWidth: '900px', height: '800px' }} 
          />
        </div>

        <div className="w-full sm:w-1/2">
          <div className="mb-6">
            <h2 className="text-5xl font-extrabold text-black">{artwork.title}</h2>
            <h3 className="text-3xl font-semibold text-black mt-2">{artwork.artist}</h3>
          </div>

          <p className="text-xl text-black mt-4 italic">"{artwork.quote}"</p> 
          <p className="text-xl text-gray-600 mt-2">{artwork.description}</p> 

          <div className="mt-6">
            <p className="text-xl text-black"><strong>Medium:</strong> {artwork.medium}</p>
            <p className="text-xl text-black"><strong>Creation Date:</strong> {artwork.date}</p>
            <p className="text-xl text-black"><strong>Dimensions:</strong> {artwork.dimensions}</p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold text-black">Tags:</p>
            <div className="flex gap-4 mt-2">
              {artwork.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-black px-4 py-2 rounded-full text-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold text-black">{artwork.price}</p>
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
