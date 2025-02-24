import React, { useState, useEffect } from "react";

// Import images
import img1 from "../assets/artworks/artwork-7.jpg";
import img2 from "../assets/artworks/artwork-8.jpg";
import img3 from "../assets/artworks/artwork-9.png";
import img4 from "../assets/artworks/artwork-6.png";
import { Link } from "react-router-dom";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null); // To track clicked image for animation
  const images = [
    { src: img1, link: "/artwork", title: "Artwork Page - Discover Unique Masterpieces" },
    { src: img3, link: "/viewroom", title: "Gallery View - Explore Stunning Art Galleries"},
    { src: img2, link: "/dashboard", title: "Auction Page - Bid for Exclusive Artworks " },
    { src: img4, link: "/events", title: "Events - Stay Updated on Art Exhibitions & Auctions" },
  ];

  const timeAutoNext = 7000;

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, timeAutoNext);

    return () => clearInterval(autoSlide);
  }, [images.length]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleThumbnailClick = (index) => {
    setClickedIndex(index);
    setActiveIndex(index); // Set clicked image as active
    setTimeout(() => {
      setClickedIndex(null); // Reset animation after a short duration
    }, 500); // Match this with animation duration
  };

  return (
    <div className="relative w-full h-[80vh] bg-black">
      {/* Carousel list */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />

            {/* Text Content on the Left Side */}
            <div className="absolute top-1/3 left-10 text-white max-w-md">
              <Link to={image.link}>
                <h1 className="text-5xl font-bold">{image.title}</h1>
              </Link>
              {/* <p className="mt-2 text-xl">
                {image.description}
              </p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails on the right horizontally */}
      <div className="absolute bottom-16 right-4 flex gap-4 z-10">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative w-32 h-48 flex-shrink-0 cursor-pointer transition-all duration-500 transform ${
              clickedIndex === index ? "scale-110" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image.src} // Ensure image.src is used correctly
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Arrows slightly below center */}
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 flex gap-4 z-10">
        <button
          onClick={handlePrev}
          className="bg-gray-300 text-black p-4 rounded-full hover:bg-white hover:text-black transition-all"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-300 text-black p-4 rounded-full hover:bg-white hover:text-black transition-all"
        >
          &gt;
        </button>
      </div> */}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-black w-full animate-progress-bar"></div>
    </div>
  );
};

export default Slider;
