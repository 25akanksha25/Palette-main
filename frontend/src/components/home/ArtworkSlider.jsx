import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Img1 from "../../assets/artworks/artwork-1.jpg";
import Img2 from "../../assets/artworks/artwork-3.jpg";
import Img3 from "../../assets/artworks/artwork-5.jpg";
import Img4 from "../../assets/artworks/artwork-7.jpg";
import Img5 from "../../assets/artworks/artwork-9.jpg";
import Img6 from "../../assets/artworks/artwork-4.jpg";

const artworks = [
  { id: 1, title: "Sunset Bliss", artist: "Victoria Veedell", image: Img1 },
  { id: 2, title: "Abstract Waves", artist: "Emily Roth", image: Img2 },
  { id: 3, title: "Nature’s Embrace", artist: "Emily Roth", image: Img3 },
  { id: 4, title: "Modern Vibes", artist: "Juno Fitz", image: Img4 },
  { id: 5, title: "Timeless Essence", artist: "Lena Morgan", image: Img5 },
  { id: 6, title: "Digital Dreams", artist: "Sarah Lee", image: Img6 },
];

const ArtworkSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full mx-auto px-4 py-12 bg-white">
      {/* Section Title */}
      <h2 className="text-4xl font-medium mb-10 flex items-center gap-3 text-black">
        Artworks You'll Love
        <FontAwesomeIcon icon={faArrowRight} className="text-black text-2xl" />
      </h2>

      {/* Slider */}
      <div className="relative overflow-hidden">
        {/* Images Container */}
        <div
          className="flex relative gap-4"
          style={{
            width: `${artworks.length * 100}%`, // Width adjusted to the number of images
          }}
        >
          {/* Sliding Images */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentIndex * 100) / 5}%)`, // Display 5 images at a time
            }}
          >
            {/* First set of images */}
            {artworks.map((artwork) => (
              <div
                key={`original-${artwork.id}`}
                className="w-1/5 flex-shrink-0 text-center relative"
              >
                {/* Image */}
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-72 object-cover border-2 border-white"
                />
                {/* Title Overlay */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xl px-2 py-1 rounded">
                  {artwork.title}
                </div>
              </div>
            ))}

            {/* Duplicate set of images */}
            {artworks.map((artwork) => (
              <div
                key={`duplicate-${artwork.id}`}
                className="w-1/5 flex-shrink-0 text-center relative"
              >
                {/* Image */}
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-72 object-cover border-2 border-black"
                />
                {/* Title Overlay */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xl px-2 py-1 rounded">
                  {artwork.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ArtworkSlider;
