import art1 from '../assets/artworks/artwork-1.jpg';
import art2 from '../assets/artworks/artwork-2.jpg';
import art3 from '../assets/artworks/artwork-3.jpg';
import art4 from '../assets/artworks/artwork-4.jpg';
import art5 from '../assets/artworks/artwork-5.jpg';
import art6 from '../assets/artworks/artwork-6.jpg';
import art7 from '../assets/artworks/artwork-7.jpg';
import art8 from '../assets/artworks/artwork-8.jpg';
import art9 from '../assets/artworks/artwork-9.jpg';

export const artworks = [
  { 
    id: 1, 
    image: art1, 
    title: 'Sunset Bliss', 
    artist: 'Victoria Veedell', 
    quote: '“As the sun sets, the world slows down and whispers peace...”', // Added quote
    description: 'A beautiful painting capturing the serenity of a sunset over a tranquil landscape. The soft, vibrant hues of the setting sun reflect on the calm waters, creating an atmosphere of peace and contemplation. Victoria Veedell’s use of color and light creates an immersive experience, inviting viewers to pause and reflect on the beauty of nature.',
    price: '₹1,300', 
    medium: 'Oil on Canvas', 
    date: '2022', 
    dimensions: '30 x 40 inches', 
    tags: ['Nature', 'Sunset', 'Oil Painting'] 
  },
  { 
    id: 2, 
    image: art2, 
    title: 'Urban Jungle', 
    artist: 'John Doe', 
    quote: '“In the chaos of the city, there is an untold beauty in the hustle.”', // Added quote
    description: 'An amazing photography of a bustling city, where the lights, people, and structures create a vibrant yet chaotic atmosphere. John Doe captures the essence of modern urban life, focusing on the interplay between nature and urban development. The intricate details of the cityscape contrast with the natural elements, offering a fresh perspective on everyday life in the city.',
    price: '₹2,000', 
    medium: 'Photography', 
    date: '2023', 
    dimensions: '24 x 36 inches', 
    tags: ['Cityscape', 'Photography', 'Urban'] 
  },
  { 
    id: 3, 
    image: art3, 
    title: 'Abstract Waves', 
    artist: 'Emily Roth', 
    quote: '“In the waves of abstraction, there is freedom to explore beyond the surface.”', // Added quote
    description: 'A rare abstract oil painting with dynamic brush strokes that evoke a sense of movement and energy. The flowing waves and swirling colors are not just a depiction of the ocean, but a symbolic representation of the internal emotions and struggles we all face. Emily Roth’s abstract style allows the viewer to interpret the artwork in a deeply personal way, making each experience unique.',
    price: '₹1,500', 
    medium: 'Oil on Canvas', 
    date: '2021', 
    dimensions: '28 x 40 inches', 
    tags: ['Abstract', 'Waves', 'Oil Painting'] 
  },
  { 
    id: 4, 
    image: art4, 
    title: 'Digital Dreams', 
    artist: 'Sarah Lee', 
    quote: '“Dreams transcend the digital world, merging reality with imagination.”', // Added quote
    description: 'A digital artwork that captures the essence of dreams through vivid colors and surreal imagery. The piece explores the blending of virtual and physical realms, where the boundaries between the two are often blurred. Sarah Lee’s intricate use of digital tools allows for a fusion of reality and fantasy, making it a powerful exploration of the mind’s inner workings.',
    price: '₹1,500', 
    medium: 'Digital Art', 
    date: '2022', 
    dimensions: '30 x 40 inches', 
    tags: ['Dreams', 'Digital', 'Art'] 
  },
  { 
    id: 5, 
    image: art5, 
    title: 'Nature’s Embrace', 
    artist: 'Emily Roth', 
    quote: '“Nature’s embrace is a reminder that simplicity holds profound beauty.”', // Added quote
    description: 'A tranquil landscape painting depicting the serene beauty of nature. The rolling hills, towering trees, and calming colors evoke a sense of peace and connection with the natural world. Emily Roth’s delicate brushwork and harmonious color palette invite the viewer to pause and appreciate the simple yet profound beauty of the environment.',
    price: '₹1,600', 
    medium: 'Oil on Canvas', 
    date: '2021', 
    dimensions: '28 x 40 inches', 
    tags: ['Nature', 'Oil Painting'] 
  },
  { 
    id: 6, 
    image: art6, 
    title: 'Whispering Woods', 
    artist: 'Alex Gault', 
    quote: '“The forest speaks in whispers, if we choose to listen.”', // Added quote
    description: 'A beautiful watercolor painting of a lush forest, where the soft interplay of light and shadows creates a sense of mystery and wonder. Alex Gault’s use of watercolor brings the landscape to life, capturing the tranquility and serenity of the woods. The piece evokes a deep connection with nature, inviting the viewer to pause and listen to the whispers of the forest.',
    price: '₹2,200', 
    medium: 'Watercolor', 
    date: '2023', 
    dimensions: '24 x 36 inches', 
    tags: ['Nature', 'Watercolor', 'Forest'] 
  },
  { 
    id: 7, 
    image: art7, 
    title: 'Modern Vibes', 
    artist: 'Juno Fitz', 
    quote: '“The modern world is a canvas, waiting to be painted with ideas.”', // Added quote
    description: 'A vibrant digital artwork that captures the essence of modern life through bold colors and geometric shapes. Juno Fitz’s work reflects the dynamic energy of contemporary society, with its fast pace and constant evolution. The piece invites viewers to interpret the world through the lens of abstraction, challenging them to see beyond the surface of everyday life.',
    price: '₹2,800', 
    medium: 'Digital Art', 
    date: '2022', 
    dimensions: '32 x 48 inches', 
    tags: ['Modern', 'Abstract', 'Digital'] 
  },
  { 
    id: 8, 
    image: art8, 
    title: 'Classic Beauty', 
    artist: 'Oscar Hunt', 
    quote: '“True beauty lies in timeless forms, unchanging through the ages.”', // Added quote
    description: 'A timeless sculpture that reflects classical beauty through its elegant design and intricate details. Oscar Hunt’s piece captures the human form in a way that transcends time, evoking a sense of grace and refinement. The sculpture stands as a tribute to the classical ideals of beauty, making it a perfect blend of art and history.',
    price: '₹2,500', 
    medium: 'Sculpture', 
    date: '2020', 
    dimensions: '48 x 72 inches', 
    tags: ['Classical', 'Sculpture', 'Art'] 
  },
  { 
    id: 9, 
    image: art9, 
    title: 'Timeless Essence', 
    artist: 'Lena Morgan', 
    quote: '“Abstract art holds the essence of timelessness, beyond time and form.”', // Added quote
    description: 'A thought-provoking abstract painting that plays with form and color to evoke deep emotions. Lena Morgan’s work captures the essence of timelessness, exploring how abstract forms can transcend the boundaries of time. The piece invites the viewer to delve into their own interpretation of the colors and shapes, creating a personal connection with the artwork.',
    price: '₹1,700', 
    medium: 'Acrylic on Canvas', 
    date: '2023', 
    dimensions: '36 x 48 inches', 
    tags: ['Abstract', 'Acrylic', 'Modern'] 
  }
];
