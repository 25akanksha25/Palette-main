import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Center } from '@react-three/drei';
import roomModel1 from '../assets/models/gallery-1.glb'; // Room 1 model
import roomModel2 from '../assets/models/gallery-2.glb'; // Room 2 model
// import roomModel3 from '../assets/models/gallery-3.glb'; // Room 3 model
import roomModel4 from '../assets/models/gallery-4.glb';
import roomModel5 from '../assets/models/gallery-5.glb';
import roomModel6 from '../assets/models/gallery-6.glb';
import roomModel7 from '../assets/models/gallery-7.glb';
import roomModel8 from '../assets/models/gallery-8.glb';
import roomModel9 from '../assets/models/gallery-9.glb';


// Add preview images for each gallery
import roomImage1 from '../assets/galleryImage/gallery-img-1.png'; // Image for Gallery 1
import roomImage2 from '../assets/galleryImage/gallery-img-2.png'; // Image for Gallery 2
// import roomImage3 from '../assets/galleryImage/gallery-img-3.png'; // Image for Gallery 3
import roomImage4 from '../assets/galleryImage/gallery-img-4.png'; // Image for Gallery 4
import roomImage5 from '../assets/galleryImage/gallery-img-5.png'; // Image for Gallery 5
import roomImage6 from '../assets/galleryImage/gallery-img-6.png'; // Image for Gallery 6
import roomImage7 from '../assets/galleryImage/gallery-img-7.png'; // Image for Gallery 7
import roomImage8 from '../assets/galleryImage/gallery-img-8.png'; // Image for Gallery 8
import roomImage9 from '../assets/galleryImage/gallery-img-9.png'; // Image for Gallery 9


const RoomModel = ({ modelPath, scale = 30 }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} />;
};

const ViewRoom = () => {
  const rooms = [
    {
      id: 1,
      name: 'Gallery 1',
      description: 'A modern art gallery showcasing contemporary works.',
      modelPath: roomModel1,
      previewImage: roomImage1, // Add preview image
    },
    {
      id: 2,
      name: 'Gallery 2',
      description: 'A classic gallery with timeless masterpieces.',
      modelPath: roomModel2,
      previewImage: roomImage2, // Add preview image
    },
    // {
    //   id: 3,
    //   name: 'Gallery 3',
    //   description: 'An immersive experience of digital art.',
    //   modelPath: roomModel3,
    //   previewImage: roomImage3, // Add preview image
    // },
    {
      id: 4,
      name: 'Gallery 4',
      description: 'A modern art gallery showcasing contemporary works.',
      modelPath: roomModel4,
      previewImage: roomImage4, // Add preview image
    },
    {
      id: 5,
      name: 'Gallery 5',
      description: 'A classic gallery with timeless masterpieces.',
      modelPath: roomModel5,
      previewImage: roomImage5, // Add preview image
    },
    {
      id: 6,
      name: 'Gallery 6',
      description: 'An immersive experience of digital art.',
      modelPath: roomModel6,
      previewImage: roomImage6, // Add preview image
    },
    {
      id: 7,
      name: 'Gallery 7',
      description: 'A modern art gallery showcasing contemporary works.',
      modelPath: roomModel7,
      previewImage: roomImage7, // Add preview image
    },
    {
      id: 8,
      name: 'Gallery 8',
      description: 'A classic gallery with timeless masterpieces.',
      modelPath: roomModel8,
      previewImage: roomImage8, // Add preview image
    },
    {
      id: 9,
      name: 'Gallery 9',
      description: 'An immersive experience of digital art.',
      modelPath: roomModel9,
      previewImage: roomImage9, // Add preview image
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Galleries</h1>

      {/* Cards for galleries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedRoom(room)}
          >
            {/* Replace 3D Model Preview with an Image */}
            <div className="h-48 bg-gray-300">
              <img
                src={room.previewImage}
                alt={`Preview of ${room.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{room.name}</h2>
              <p className="text-gray-600 mt-2">{room.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for 3D Viewer */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">
              {selectedRoom.name}
            </h2>
            <div className="w-full h-5/6">
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
                  maxPolarAngle={Math.PI} // Full vertical rotation
                  minPolarAngle={0}
                />
              </Canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRoom;
