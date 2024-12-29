import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Center } from '@react-three/drei';
import galleryHomeImage from '../assets/galleryhome.jfif';
import roomModel1 from '../assets/models/gallery-1.glb'; // Room 1 model
import roomModel2 from '../assets/models/gallery-2.glb'; // Room 2 model
import roomModel4 from '../assets/models/gallery-4.glb';
import roomModel5 from '../assets/models/gallery-5.glb';
import roomModel6 from '../assets/models/gallery-6.glb';
import roomModel7 from '../assets/models/gallery-7.glb';
import roomModel8 from '../assets/models/gallery-8.glb';
import roomModel9 from '../assets/models/gallery-9.glb';

// Add preview images for each gallery
import roomImage1 from '../assets/galleryImage/gallery-img-1.png';
import roomImage2 from '../assets/galleryImage/gallery-img-2.png';
import roomImage4 from '../assets/galleryImage/gallery-img-4.png';
import roomImage5 from '../assets/galleryImage/gallery-img-5.png';
import roomImage6 from '../assets/galleryImage/gallery-img-6.png';
import roomImage7 from '../assets/galleryImage/gallery-img-7.png';
import roomImage8 from '../assets/galleryImage/gallery-img-8.png';
import roomImage9 from '../assets/galleryImage/gallery-img-9.png';

const RoomModel = ({ modelPath, scale = 30 }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} />;
};

const ViewRoom = () => {
  const rooms = [
    {
      id: 1,
      name: 'Hall of Timeless Treasures',
      description: 'Explore timeless masterpieces in a grand hall, celebrating the beauty of traditional artistry.',
      modelPath: roomModel1,
      previewImage: roomImage1,
      tags: ['Classic Art', 'Traditional Gallery', 'Portraits'],
    },
    {
      id: 2,
      name: 'Street Art Studio',
      description: 'Explore a vibrant street art gallery showcasing graffiti and portraits that reflect modern culture.',
      modelPath: roomModel2,
      previewImage: roomImage2,
      tags: ['Street Art', 'Murals', 'Contemporary Art'],
    },
    {
      id: 4,
      name: 'Gallery Walkway',
      description: 'Explore a minimalist gallery with clean lines and a calm atmosphere.',
      modelPath: roomModel4,
      previewImage: roomImage4,
      tags: ['Minimalism', 'Clean Lines', 'Modern Design'],
    },
    {
      id: 5,
      name: 'Open to the Sky',
      description: 'A gallery with a dramatic skylight, inviting the outside in.',
      modelPath: roomModel5,
      previewImage: roomImage5,
      tags: ['Skylight', 'Open Space', 'Platform'],
    },
    {
      id: 6,
      name: 'Spotlight on Art',
      description: 'A minimalist gallery with arched ceilings and dramatic lighting, ideal for showcasing art.',
      modelPath: roomModel6,
      previewImage: roomImage6,
      tags: ['Dramatic Lighting', 'Arched', 'Loft'],
    },
    {
      id: 7,
      name: 'Blank Slate',
      description: 'A striking, stark white gallery for bold, contemporary art.',
      modelPath: roomModel7,
      previewImage: roomImage7,
      tags: ['White Cube', 'Bold Artwork'],
    },
    {
      id: 8,
      name: 'Industrial Chic',
      description: 'A raw, industrial space with exposed brick walls and natural light filtering through large windows.',
      modelPath: roomModel8,
      previewImage: roomImage8,
      tags: ['Exposed Brick', 'Warehouse', 'Large Windows'],
    },
    {
      id: 9,
      name: 'Skylight Serenity',
      description: 'A serene, minimalist gallery bathed in soft light filters through a dramatic skylight.',
      modelPath: roomModel9,
      previewImage: roomImage9,
      tags: ['Platform', 'Minimalist Architecture', 'Skylight'],
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="w-full h-full bg-white">
      {/* Header Section */}
      <div className="relative w-full h-[400px] bg-gray-100 flex">
        {/* Text Content */}
        <div className="flex flex-col mt-8 max-w-lg px-8 py-4">
          <div className="text-6xl text-black font-bold mb-4">
            Discover Our Special Feature
          </div>
          <div className="text-lg text-gray-700 mt-3">
            Explore curated galleries featuring timeless and modern treasures. 
            Discover themes from classical to street art, each offering an immersive experience. 
            Dive into creative environments.
          </div>
        </div>

        {/* Image Covering Entire Right Side */}
        <div className="flex-1 h-full">
          <img
            src={galleryHomeImage}
            alt="Header background"
            className="w-full h-full object-cover shadow-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center p-8 mt-6">
        {/* Browse Galleries Text with Arrow Icon */}
        <div className="text-4xl font-bold text-black mb-6 self-start flex items-center gap-2">
          Browse Galleries
          <FontAwesomeIcon icon={faArrowRight} className="text-xl cursor-pointer" />
        </div>

        {/* Cards for galleries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden cursor-pointer p-4"
            >
              {/* Replace 3D Model Preview with an Image */}
              <div className="h-60 bg-gray-300">
                <img
                  src={room.previewImage}
                  alt={`Preview of ${room.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xl font-bold text-gray-800">{room.name}</div>
                <div className="text-gray-600 mt-2">{room.description}</div>
                <div className="flex gap-2 mt-2">
                  {room.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 border-2 border-gray-300 px-2 py-1 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="group bg-white text-black border-2 border-gray-800 px-4 py-2 rounded mt-4 flex items-center justify-center gap-2 hover:bg-black"
                  onClick={() => setSelectedRoom(room)}
                >
                  <span className="group-hover:text-white transition duration-300">View Model</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-black group-hover:text-white transition duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for 3D Viewer */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 rounded-lg shadow-lg w-3/4 h-3/4 relative">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 bg-gray-100 text-black border-2 border-black hover:bg-black hover:text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <div className="text-2xl font-bold text-gray-800 text-center mt-4">
                {selectedRoom.name}
              </div>
              <div className="w-full h-5/6 mt-4">
                <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
                  {/* Lighting */}
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 10]} intensity={1} />

                  {/* Center the model */}
                  <Center>
                    <RoomModel modelPath={selectedRoom.modelPath} />
                  </Center>

                  {/* Add Environment for better visuals */}
                  <Environment preset="city" />

                  {/* Enhanced OrbitControls */}
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI}
                    minPolarAngle={0}
                  />
                </Canvas>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRoom;