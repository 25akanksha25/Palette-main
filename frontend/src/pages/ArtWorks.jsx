
import React from 'react';
import { Link } from 'react-router-dom';
import { artworks } from './artdata'; 

const ArtWorks = () => {

  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white ml-6 p-6 min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl text-black">Collect Art</h1>
        <Link>
          <button 
            className="border-2 border-black p-3 rounded-xl text-lg text-black hover:text-white hover:bg-black"
            to={logInUser ? "/purchaseartwork" : "/login"}
          >
            Upload Art Piece
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-12">
        {artworks.map((artwork) => (
          <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
            <div className="bg-gray-100 p-2 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src={artwork.image}
                  alt={`Artwork ${artwork.id}`}
                  className="w-full object-cover rounded-lg"
                  style={{
                    aspectRatio: '1 / 1',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-black">{artwork.artist}</h3>
                <div className="flex gap-2 mt-2">
                  {artwork.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-lg text-black mt-4 font-bold">{artwork.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtWorks;
