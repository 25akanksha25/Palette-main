import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Center } from '@react-three/drei';
import { FaMapMarkerAlt, FaPhoneAlt, FaRuler, FaUsers, FaCogs, FaClock, FaFileContract, FaDollarSign } from 'react-icons/fa';

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
      address: '123 Museum Avenue, Art District, Art City, ABC State, 12345, Near the Grand Art Museum, Opposite the Central Park Entrance',
      contact: {
        phone: '+91 2345678904',
        email: 'halloftimeless@artgallery.com',
      },
      size: '5000 sq ft',
      capacity: '200 people',
      availableFacilities: [
        'Advanced lighting system for art displays',
        'High-quality display stands',
        'Secure storage for artwork',
        '24/7 security surveillance',
      ],
      bookingCharges: '₹50,000 per day',
      rentalPolicy: 'Full payment required at booking, refundable up to 48 hours before the event',
      galleryTimings: [
        'Monday to Friday: Closed',
        'Saturday & Sunday: 9:00 AM - 6:00 PM',
        'Public Holidays: 9:00 AM - 6:00 PM'
      ],
    },
    {
      id: 2,
      name: 'Street Art Studio',
      description: 'Explore a vibrant street art gallery showcasing graffiti and portraits that reflect modern culture.',
      modelPath: roomModel2,
      previewImage: roomImage2,
      tags: ['Street Art', 'Murals', 'Contemporary Art'],
      address: '456 Urban Boulevard, Creative District, Art City, XYZ State, 67890, Near the Creative Plaza, Adjacent to Main Street',
      contact: {
        phone: '+987 654 3210',
        email: 'streetart@artgallery.com',
      },
      size: '3000 sq ft',
      capacity: '100 people',
      availableFacilities: [
        'Natural lighting',
        'Projector and sound system',
        'Storage for artwork',
        '24/7 security surveillance',
      ],
      bookingCharges: '₹20,000 per day',
      rentalPolicy: '50% deposit required at booking, non-refundable',
      galleryTimings: [
        'Monday to Saturday: 10:00 AM - 8:00 PM',
        'Sunday: Closed',
        'Public Holidays: 10:00 AM - 8:00 PM'
      ],
    },
    {
      id: 4,
      name: 'Gallery Walkway',
      description: 'Explore a minimalist gallery with clean lines and a calm atmosphere.',
      modelPath: roomModel4,
      previewImage: roomImage4,
      tags: ['Minimalism', 'Clean Lines', 'Modern Design'],
      address: '789 Serenity Lane, Art District, Tranquil City, PQR State, 11223, Near the Peaceful Gardens, Across from Serenity Park',
      contact: {
        phone: '+91 1112223333',
        email: 'walkway@artgallery.com',
      },
      size: '4000 sq ft',
      capacity: '150 people',
      availableFacilities: [
        'Customizable lighting',
        'Moveable display stands',
        'Temperature-controlled storage',
        'Security personnel on-site',
      ],
      bookingCharges: '₹45,000 per day',
      rentalPolicy: 'Full payment required at booking, refundable up to 72 hours before the event',
      galleryTimings: [
        'Monday to Friday: 8:00 AM - 5:00 PM',
        'Saturday & Sunday: 10:00 AM - 6:00 PM',
        'Public Holidays: 10:00 AM - 6:00 PM',
      ],
    },
    {
      id: 5,
      name: 'Open to the Sky',
      description: 'A gallery with a dramatic skylight, inviting the outside in.',
      modelPath: roomModel5,
      previewImage: roomImage5,
      tags: ['Skylight', 'Open Space', 'Platform'],
      address: '101 Skylight Avenue, Open Plaza, Sky City, LMN State, 33456, Close to Skybridge Mall, Opposite the Central Park',
      contact: {
        phone: '+91 3334445555',
        email: 'opentosky@artgallery.com',
      },
      size: '6000 sq ft',
      capacity: '250 people',
      availableFacilities: [
        'Natural light from skylight',
        'Event management support',
        'Storage for equipment',
        'Security cameras and monitoring',
      ],
      bookingCharges: '₹35,000 per day',
      rentalPolicy: 'Non-refundable booking with flexible date changes',
      galleryTimings: [
        'Monday to Saturday: 7:00 AM - 9:00 PM',
        'Sunday: 10:00 AM - 7:00 PM',
        'Public Holidays: 8:00 AM - 9:00 PM',
      ],
    },
    {
      id: 6,
      name: 'Spotlight on Art',
      description: 'A minimalist gallery with arched ceilings and dramatic lighting, ideal for showcasing art.',
      modelPath: roomModel6,
      previewImage: roomImage6,
      tags: ['Dramatic Lighting', 'Arched', 'Loft'],
      address: '245 Creative Arch Lane, Downtown Arts, Artistic City, TUV State, 78901, Near the Grand Art Hall, Facing the Central Square',
      contact: {
        phone: '+91 5556789101',
        email: 'spotlight@artgallery.com',
      },
      size: '4500 sq ft',
      capacity: '180 people',
      availableFacilities: [
        'Advanced lighting system',
        'Curved display stands',
        'Storage for exhibits',
        '24-hour security monitoring',
      ],
      bookingCharges: '₹55,000 per day',
      rentalPolicy: 'Deposit required, refundable within 48 hours before the event',
      galleryTimings: [
        'Saturday: 10:00 AM - 7:00 PM',
        'Sunday: 11:00 AM - 6:00 PM',
        'Monday to Friday: Closed',
        'Public Holidays: Closed',
      ],
    },
    {
      id: 7,
      name: 'Blank Slate',
      description: 'A striking, stark white gallery for bold, contemporary art.',
      modelPath: roomModel7,
      previewImage: roomImage7,
      tags: ['White Cube', 'Bold Artwork'],
      address: '789 Modernity Street, Art Quarter, New Era City, STU State, 34567, Between City Library and The Modern Park',
      contact: {
        phone: '+91 4449991234',
        email: 'blankslate@artgallery.com',
      },
      size: '5000 sq ft',
      capacity: '200 people',
      availableFacilities: [
        'Customizable wall panels',
        'High-tech sound system',
        'Temperature-controlled storage',
        'Security guards during events',
      ],
      bookingCharges: '₹60,000 per day',
      rentalPolicy: 'Non-refundable booking with rescheduling flexibility',
      galleryTimings: [
        'Monday to Saturday: 9:00 AM - 6:00 PM',
        'Sunday: 10:00 AM - 5:00 PM',
        'Public Holidays: 9:00 AM - 6:00 PM',
      ],
    },
    {
      id: 8,
      name: 'Industrial Chic',
      description: 'A raw, industrial space with exposed brick walls and natural light filtering through large windows.',
      modelPath: roomModel8,
      previewImage: roomImage8,
      tags: ['Exposed Brick', 'Warehouse', 'Large Windows'],
      address: '102 Brickway Road, Warehouse District, Industrial City, WXY State, 56789, Near Brick Factory, Adjacent to Riverside',
      contact: {
        phone: '+91 2223336789',
        email: 'industrialchic@artgallery.com',
      },
      size: '7000 sq ft',
      capacity: '300 people',
      availableFacilities: [
        'Natural light from large windows',
        'Mobile display stands',
        'Spacious storage area',
        'On-site security team',
      ],
      bookingCharges: '₹10,000 per day',
      rentalPolicy: 'Full payment upfront, refundable up to 72 hours before the event',
      galleryTimings: [
        'Monday to Friday: 8:00 AM - 8:00 PM',
        'Saturday & Sunday: 9:00 AM - 7:00 PM',
        'Public Holidays: 9:00 AM - 7:00 PM',
      ],
    },
    {
      id: 9,
      name: 'Skylight Serenity',
      description: 'A serene, minimalist gallery bathed in soft light filters through a dramatic skylight.',
      modelPath: roomModel9,
      previewImage: roomImage9,
      tags: ['Platform', 'Minimalist Architecture', 'Skylight'],
      address: '456 Skylight Avenue, Serene District, Tranquil City, UVW State, 90876, Beside Skylight Tower, Near the City Fountain',
      contact: {
        phone: '+91 8887774567',
        email: 'skylightserenity@artgallery.com',
      },
      size: '6000 sq ft',
      capacity: '250 people',
      availableFacilities: [
        'Soft skylight illumination',
        'Premium display fixtures',
        'Temperature-controlled environment',
        'Round-the-clock security services',
      ],
      bookingCharges: '₹35,000 per day',
      rentalPolicy: 'Refundable booking with 24-hour cancellation notice',
      galleryTimings: [
        'Monday to Friday: 9:00 AM - 7:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: Closed',
        'Public Holidays: 9:00 AM - 7:00 PM',
      ],
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);

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
                <div className="flex gap-3 mt-4">
                  <button
                    className="group bg-white text-black border-2 border-gray-800 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-black"
                    onClick={() => setSelectedRoom(room)}
                  >
                    <span className="group-hover:text-white transition duration-300">View Model</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-black group-hover:text-white transition duration-300"
                    />
                  </button>
                  <button
                    onClick={() => setBookingRoom(room)}
                    className="bg-white text-black p-3 rounded-md hover:bg-black hover:text-white"
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} size="xl" />
                  </button>
                </div>
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

        {bookingRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 h-full relative p-8 overflow-y-auto">
              <button
                onClick={() => setBookingRoom(null)}
                className="absolute top-4 right-4 bg-gray-100 text-black border-2 border-black hover:bg-black hover:text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <h2 className="text-3xl font-bold mb-4">Booking Details for {bookingRoom.name}</h2>
              <img src={bookingRoom.previewImage} alt="Room Preview" className="w-full h-2/4" />
              {/* Scrollable container for the booking details */}
              <div className="mt-2 max-h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> Address:
                    </h3>
                    <p>{bookingRoom.address}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaPhoneAlt className="mr-2" /> Contact:
                    </h3>
                    <p>Phone - {bookingRoom.contact.phone}</p>
                    <p>Email - {bookingRoom.contact.email}</p>
                  </div>

                  {/* Right Column */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaRuler className="mr-2" /> Size:
                    </h3>
                    <p>{bookingRoom.size}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaUsers className="mr-2" /> Capacity:
                    </h3>
                    <p>{bookingRoom.capacity}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaCogs className="mr-2" /> Available Facilities:
                    </h3>
                    <ul className="list-disc list-inside">
                      {bookingRoom.availableFacilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaClock className="mr-2" /> Gallery Timings:
                    </h3>
                    <ul className="list-disc list-inside">
                      {bookingRoom.galleryTimings.map((timing, index) => (
                        <li key={index}>{timing}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Left Column continued */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaFileContract className="mr-2" /> Rental Policy:
                    </h3>
                    <p>{bookingRoom.rentalPolicy}</p>
                  </div>

                  {/* Right Column continued */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <FaDollarSign className="mr-2" /> Booking Charges:
                    </h3>
                    <p>{bookingRoom.bookingCharges}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewRoom;