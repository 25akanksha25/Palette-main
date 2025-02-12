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


export const rooms = [
    {
      id: 1,
      name: 'Hall of Timeless Treasures',
      description: 'Explore timeless masterpieces in a grand hall, celebrating the beauty of traditional artistry.',
      modelPath: roomModel1,
      previewImage: roomImage1,
      tags: ['Classic Art', 'Traditional Gallery', 'Portraits'],
      address: '123 Museum Avenue, Art City',
      contact: {
        phone: '+91 2345678904',
        email: 'halloftimeless@artgallery.com',
        website: 'www.artgallery.com/hall-treasures',
      },
      size: '5000 sq ft',
      capacity: '200 people',
      availableFacilities: [
        'Lighting system',
        'Display stands',
        'Storage for artwork',
        'Security surveillance',
      ],
      bookingCharges: '$500 per day',
      rentalPolicy: 'Full payment required at booking, refundable up to 48 hours before the event',
      galleryTimings: [
        'Monday to Friday: Closed',
        'Saturday & Sunday: 9:00 AM - 6:00 PM',
        'Public Holidays: 9:00 AM - 6:00 PM',
      ],
      availability: 'Available on weekends and public holidays',
    },
    {
      id: 2,
      name: 'Street Art Studio',
      description: 'Explore a vibrant street art gallery showcasing graffiti and portraits that reflect modern culture.',
      modelPath: roomModel2,
      previewImage: roomImage2,
      tags: ['Street Art', 'Murals', 'Contemporary Art'],
      address: '456 Urban Boulevard, Creative District',
      contact: {
        phone: '+987 654 3210',
        email: 'streetart@artgallery.com',
        website: 'www.artgallery.com/street-art-studio',
      },
      size: '3000 sq ft',
      capacity: '100 people',
      availableFacilities: [
        'Natural lighting',
        'Projector and sound system',
        'Storage for artwork',
        '24/7 security surveillance',
      ],
      bookingCharges: '$400 per day',
      rentalPolicy: '50% deposit required at booking, non-refundable',
      galleryTimings: '10:00 AM - 8:00 PM',
      availability: 'Open every day except Monday',
    },
    {
      id: 4,
      name: 'Gallery Walkway',
      description: 'Explore a minimalist gallery with clean lines and a calm atmosphere.',
      modelPath: roomModel4,
      previewImage: roomImage4,
      tags: ['Minimalism', 'Clean Lines', 'Modern Design'],
      address: '789 Serenity Lane, Art District',
      contact: {
        phone: '+111 222 3333',
        email: 'walkway@artgallery.com',
        website: 'www.artgallery.com/gallery-walkway',
      },
      size: '4000 sq ft',
      capacity: '150 people',
      availableFacilities: [
        'Customizable lighting',
        'Moveable display stands',
        'Temperature-controlled storage',
        'Security personnel on-site',
      ],
      bookingCharges: '$450 per day',
      rentalPolicy: 'Full payment required at booking, refundable up to 72 hours before the event',
      galleryTimings: '8:00 AM - 5:00 PM',
      availability: 'Available for corporate and private bookings',
    },
    {
      id: 5,
      name: 'Open to the Sky',
      description: 'A gallery with a dramatic skylight, inviting the outside in.',
      modelPath: roomModel5,
      previewImage: roomImage5,
      tags: ['Skylight', 'Open Space', 'Platform'],
      address: '101 Skylight Avenue, Open Plaza',
      contact: {
        phone: '+333 444 5555',
        email: 'opentosky@artgallery.com',
        website: 'www.artgallery.com/open-to-sky',
      },
      size: '6000 sq ft',
      capacity: '250 people',
      availableFacilities: [
        'Natural light from skylight',
        'Event management support',
        'Storage for equipment',
        'Security cameras and monitoring',
      ],
      bookingCharges: '$700 per day',
      rentalPolicy: 'Non-refundable booking with flexible date changes',
      galleryTimings: '7:00 AM - 9:00 PM',
      availability: 'Available for events with prior booking',
    },
    {
    id: 6,
    name: 'Spotlight on Art',
    description: 'A minimalist gallery with arched ceilings and dramatic lighting, ideal for showcasing art.',
    modelPath: roomModel6,
    previewImage: roomImage6,
    tags: ['Dramatic Lighting', 'Arched', 'Loft'],
    address: '245 Creative Arch Lane, Downtown Arts',
    contact: {
      phone: '+555 678 9101',
      email: 'spotlight@artgallery.com',
      website: 'www.artgallery.com/spotlight',
    },
    size: '4500 sq ft',
    capacity: '180 people',
    availableFacilities: [
      'Advanced lighting system',
      'Curved display stands',
      'Storage for exhibits',
      '24-hour security monitoring',
    ],
    bookingCharges: '$550 per day',
    rentalPolicy: 'Deposit required, refundable within 48 hours before the event',
    galleryTimings: '10:00 AM - 7:00 PM',
    availability: 'Available on weekdays only',
  },
  {
    id: 7,
    name: 'Blank Slate',
    description: 'A striking, stark white gallery for bold, contemporary art.',
    modelPath: roomModel7,
    previewImage: roomImage7,
    tags: ['White Cube', 'Bold Artwork'],
    address: '789 Modernity Street, Art Quarter',
    contact: {
      phone: '+444 999 1234',
      email: 'blankslate@artgallery.com',
      website: 'www.artgallery.com/blank-slate',
    },
    size: '5000 sq ft',
    capacity: '200 people',
    availableFacilities: [
      'Customizable wall panels',
      'High-tech sound system',
      'Temperature-controlled storage',
      'Security guards during events',
    ],
    bookingCharges: '$600 per day',
    rentalPolicy: 'Non-refundable booking with rescheduling flexibility',
    galleryTimings: '9:00 AM - 6:00 PM',
    availability: 'Available all year round with prior reservation',
  },
  {
    id: 8,
    name: 'Industrial Chic',
    description: 'A raw, industrial space with exposed brick walls and natural light filtering through large windows.',
    modelPath: roomModel8,
    previewImage: roomImage8,
    tags: ['Exposed Brick', 'Warehouse', 'Large Windows'],
    address: '102 Brickway Road, Warehouse District',
    contact: {
      phone: '+222 333 6789',
      email: 'industrialchic@artgallery.com',
      website: 'www.artgallery.com/industrial-chic',
    },
    size: '7000 sq ft',
    capacity: '300 people',
    availableFacilities: [
      'Natural light from large windows',
      'Mobile display stands',
      'Spacious storage area',
      'On-site security team',
    ],
    bookingCharges: '$800 per day',
    rentalPolicy: 'Full payment upfront, refundable up to 72 hours before the event',
    galleryTimings: '8:00 AM - 8:00 PM',
    availability: 'Open for events and exhibitions upon booking',
  },
  {
    id: 9,
    name: 'Skylight Serenity',
    description: 'A serene, minimalist gallery bathed in soft light filters through a dramatic skylight.',
    modelPath: roomModel9,
    previewImage: roomImage9,
    tags: ['Platform', 'Minimalist Architecture', 'Skylight'],
    address: '456 Skylight Avenue, Serene District',
    contact: {
      phone: '+888 777 4567',
      email: 'skylightserenity@artgallery.com',
      website: 'www.artgallery.com/skylight-serenity',
    },
    size: '6000 sq ft',
    capacity: '250 people',
    availableFacilities: [
      'Soft skylight illumination',
      'Premium display fixtures',
      'Temperature-controlled environment',
      'Round-the-clock security services',
    ],
    bookingCharges: '$700 per day',
    rentalPolicy: 'Refundable booking with 24-hour cancellation notice',
    galleryTimings: '9:00 AM - 7:00 PM',
    availability: 'Open for private and public exhibitions',
  },
];
