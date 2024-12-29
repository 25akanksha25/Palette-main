import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";

//Images of articles
import Img1 from "../../assets/articleImage/articleImg-1.jpg"; 
import Img2 from "../../assets/articleImage/articleImg-2.jpg";
import Img3 from "../../assets/articleImage/articleImg-3.jpg";
import Img4 from "../../assets/articleImage/articleImg-4.jpg";
import Img5 from "../../assets/articleImage/articleImg-5.jpg";
import Img6 from "../../assets/articleImage/articleImg-6.jpg";
import Img7 from "../../assets/articleImage/articleImg-7.jpg";
import Img8 from "../../assets/articleImage/articleImg-8.jpg";



const Editorial = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Articles Data
  const articles = [
    {
      id: 1,
      title: "Exploring the World of Contemporary Art",
      excerpt: "Discover the emerging trends in contemporary art and what innovative artists around the world are creating in this dynamic era of artistic expression.",
      content: "Contemporary art is an ever-evolving field that reflects the complexities of modern life. From digital installations to socially charged murals, artists are pushing the boundaries of creativity. Emerging trends include the use of AI-generated art, immersive experiences, and greater focus on environmental sustainability.",
      image: Img1,
    },
    {
      id: 2,
      title: "The Future of Digital Art",
      excerpt: "A deep dive into the evolving landscape of digital art, and how cutting-edge technology is shaping the future of visual expression and transforming creative possibilities.",
      content: "Digital art is reshaping the way we perceive and interact with creative works. With the rise of NFTs, virtual galleries, and augmented reality, artists are finding innovative ways to monetize their work and reach global audiences. This article explores how these technologies are democratizing the art world.",
      image: Img2,
    },
    {
      id: 3,
      title: "The Role of Museums in Modern Society",
      excerpt: "Museums are evolving into vibrant community hubs and interactive learning spaces, serving as cultural touchstones and fostering a deeper understanding of our shared history.",
      content: "Museums are redefining their role in society, evolving into dynamic centers of creativity and education. Through virtual tours, augmented reality, and immersive exhibits, they combine technology with tradition to offer visitors unforgettable experiences. By hosting workshops, events, and cultural activities, museums are fostering deeper connections and making heritage more accessible to all.",
      image: Img3,
    },
    {
      id: 4,
      title: "Art and Mental Health",
      excerpt: "Art therapy provides a creative outlet for self-expression, helping individuals process emotions, reduce stress, and build resilience. Through various art forms, people can safely explore their feelings, fostering emotional healing and growth.",
      content: "Art therapy is becoming an increasingly popular tool for addressing mental health challenges. It offers a non-verbal outlet for self-expression, allowing individuals to explore complex emotions, process difficult experiences, and cope with stress more effectively. Through creative activities, it fosters emotional healing and promotes overall well-being.",
      image: Img4,
    },
    {
      id: 5,
      title: "Street Art as a Voice for Change",
      excerpt: "Street art is a powerful form of social and political commentary, using public spaces to address issues like inequality, human rights, and the environment. Through murals and graffiti, artists inspire change in communities worldwide.",
      content: "Street art is not just about vibrant murals; it serves as a powerful platform for marginalized communities to express their stories, raise awareness, and push for social change. This article delves into how urban spaces are evolving into canvases for activism, where artists tackle issues like inequality, environmentalism, and human rights.",
      image: Img5,
    },
    {
      id: 6,
      title: "The Rise of Minimalist Design in Art",
      excerpt: "Minimalism is influencing both contemporary art and interior design, focusing on simplicity, clean lines, and the removal of excess to create calming, visually striking works that promote tranquility and mindful living.",
      content: "The philosophy of 'less is more' is gaining traction in the art world. Minimalist art, with its focus on simplicity, clean aesthetics, and thoughtful use of space, appeals to audiences seeking tranquility, balance, and clarity in an overstimulated world. It encourages a deeper connection with the artwork, inviting viewers to focus on the essential elements and embrace the beauty of restraint. As the minimalist movement continues to evolve, it also influences interior design, where pared-down spaces foster calm and mindful living.",
      image: Img6,
    },
    {
      id: 7,
      title: "Art Education in the Digital Age",
      excerpt: "Online platforms are revolutionizing how we learn about art, making art education more accessible to people around the world.",
      content: "From virtual art classes to online museum tours, the internet has made art education more accessible than ever. This article highlights the best resources for aspiring artists and art enthusiasts. With interactive tools and virtual galleries, learners can now explore a vast range of artistic styles and techniques. The availability of online tutorials and workshops allows individuals to enhance their skills at their own pace. Additionally, art communities and forums provide opportunities for collaboration and feedback, fostering a global exchange of creative ideas.",
      image: Img7,
    },
    {
      id: 8,
      title: "Sustainable Practices in the Art World",
      excerpt: "Artists are adopting eco-friendly methods to create a positive environmental impact, using sustainable practices and reducing waste through their art.",
      content: "From using recycled materials to reducing carbon footprints in installations, the art world is embracing sustainability. Artists are exploring innovative ways to create eco-friendly art, such as using upcycled materials and sustainable mediums. This article explores how artists are contributing to the green movement, raising awareness about environmental issues, and inspiring audiences to take action for a more sustainable future.",
      image: Img8,
    },
  ];

  // Open Modal with Article Details
  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      {/* Section Title */}
      <h2 className="text-4xl font-medium mb-10 items-center flex gap-3 text-left text-black">
        Editorial
        <FontAwesomeIcon icon={faArrowRight} className="text-black text-2xl" />
      </h2>

      {/* Article Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side (2 Articles - Larger) */}
        <div className="lg:col-span-1 space-y-6">
          {articles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {article.title}
                </h3>
                <p className="text-gray-600 mt-3">{article.excerpt}</p>
                <button
                  onClick={() => handleReadMore(article)}
                  className="text-pink-600 hover:underline mt-4 inline-block text-lg"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side (6 Articles - Smaller) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.slice(2).map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-black">
                  {article.title}
                </h3>
                <p className="text-gray-700 text-medium mt-2">{article.excerpt}</p>
                <button
                  onClick={() => handleReadMore(article)}
                  className="text-pink-600 hover:underline mt-4 inline-block"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-black hover:text-pink-600"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {/* Modal Content */}
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-md mb-6 mt-4"
            />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedArticle.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {selectedArticle.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editorial;
