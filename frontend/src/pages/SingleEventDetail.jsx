// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getSingleEventById } from "../store/event/eventSlice";
// import { toast } from "react-toastify";

// const SingleEventDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { singleEvent: event, isLoading, isError, message } = useSelector((state) => state.event);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     dispatch(getSingleEventById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (event?.endDate) {
//       const interval = setInterval(() => {
//         const now = new Date().getTime();
//         const endDate = new Date(event.endDate).getTime();
//         const difference = endDate - now;

//         if (difference > 0) {
//           const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((difference % (1000 * 60)) / 1000);
//           setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//         } else {
//           setTimeLeft("Closed");
//           clearInterval(interval);
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [event]);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) {
//     toast.error(message || "Error loading event.");
//     return <p>Error loading event.</p>;
//   }
//   if (!event) return <p>Event not found.</p>;

//   return (
//     <div className="bg-white">
//       {/* Event Header Image */}
//       {event.eventImage && (
//         <img src={event.eventImage} alt={event.title} className="w-full object-cover" style={{ maxHeight: "400px" }} />
//       )}

//       {/* Main Content */}
//       <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Section (Event Title & Countdown Timer) */}
//         <div className="md:col-span-1">
//           <h1 className="text-5xl font-extrabold text-black">{event.title}</h1>
//           <h3 className="text-2xl font-semibold italic text-gray-800"> ~ {event.seller?.fullName || "Unknown"}</h3>
//           {/* <p className="text-2xl text-gray-600 mt-2">
//             {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
//           </p> */}

//           {/* Countdown Timer */}
//           <div className="bg-gray-100 p-4 rounded-lg mt-4">
//             <p className="text-2xl font-bold text-black">Closes in:</p>
//             <p className="text-2xl text-red-600 font-semibold">{timeLeft}</p>
//           </div>

//           {/* Pricing */}
          
//         </div>

//         {/* Right Section (Tabs & Content) */}
//         <div className="md:col-span-2">
//           {/* Tab Navigation */}
//           <div className="flex space-x-8 border-b-2 pb-2">
//             <button
//               className={`text-xl font-semibold pb-2 ${activeTab === "overview" ? "border-b-4 border-black" : "text-gray-500"}`}
//               onClick={() => setActiveTab("overview")}
//             >
//               Overview
//             </button>
//             <button
//               className={`text-xl font-semibold pb-2 ${activeTab === "location" ? "border-b-4 border-black" : "text-gray-500"}`}
//               onClick={() => setActiveTab("location")}
//             >
//               Location
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-4">
//         {activeTab === "overview" && (
//           <div>
//             <p className="text-gray-600">{event.description}</p>

//             {/* Tags for Category, Event Type, and Age Restriction */}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {event.category?.name && (
//                 <span className="bg-gray-200  text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                   {event.category.name}
//                 </span>
//               )}
//               {event.eventType && (
//                 <span className="bg-gray-200  text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                   {event.eventType}
//                 </span>
//               )}
//               <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                 {event.ageRestriction || "All Ages"}
//               </span>
//       </div>

//       <p className="text-gray-600 mt-2"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//       <p className="text-gray-600"><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//       <p className="text-gray-600 mt-2"><strong>Start Time:</strong> {event.startTime}</p>
//       <p className="text-gray-600"><strong>End Time:</strong> {event.endTime}</p>

//       {/* Entry Fee Section */}
//       <div className="bg-gray-100 p-4 rounded-lg mt-4">
//         <p className="text-2xl font-bold text-black">Entry Fee:</p>
//         <p className="text-2xl text-gray-700">Rs {event.pricing}</p>
//       </div>
//     </div>
//   )}

//   {activeTab === "location" && (
//     <div>
//       <p className="text-gray-600"><strong>Location:</strong> {event.location?.name || "Not specified"}</p>
//       <p className="text-gray-600"><strong>Gallery's Address:</strong> {event.galleryAddress || "Not specified"}</p>
//     </div>
//   )}
// </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default SingleEventDetail;






import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleEventById } from "../store/event/eventSlice";
import { toast } from "react-toastify";

const SingleEventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleEvent: event, isLoading, isError, message } = useSelector((state) => state.event);
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(getSingleEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event?.startDate && event?.endDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        // const endDate = new Date(event.endDate).getTime();
        // const difference = endDate - now;
        const startDate = new Date(event.startDate).getTime();
        const endDate = new Date(event.endDate).getTime();

        if (now < startDate) {
          const difference = startDate - now;
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          // setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
          setTimeLeft(`Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else if (now >= startDate && now < endDate) {
          // Live Event
          const difference = endDate - now;
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`Closes in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }else {
          setTimeLeft("Closed");
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [event]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error(message || "Error loading event.");
    return <p>Error loading event.</p>;
  }
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="bg-white">
      {/* Event Header Image */}
      {event.eventImage && (
        <img src={event.eventImage} alt={event.title} className="w-full object-cover" style={{ maxHeight: "400px" }} />
      )}

      {/* Main Content */}
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section (Event Title & Countdown Timer) */}
        <div className="md:col-span-1">
          <h1 className="text-5xl font-extrabold text-black">{event.title}</h1>
          <h3 className="text-2xl font-semibold italic text-gray-800"> ~ {event.seller?.fullName || "Unknown"}</h3>
          {/* <p className="text-2xl text-gray-600 mt-2">
            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
          </p> */}

          {/* Countdown Timer */}
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            {/* <p className="text-2xl font-bold text-black">Closes in:</p> */}
            <p className="text-2xl text-red-600 font-semibold">{timeLeft}</p>
          </div>

          {/* Pricing */}
          
        </div>

        {/* Right Section (Tabs & Content) */}
        <div className="md:col-span-2">
          {/* Tab Navigation */}
          <div className="flex space-x-8 border-b-2 pb-2">
            <button
              className={`text-xl font-semibold pb-2 ${activeTab === "overview" ? "border-b-4 border-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`text-xl font-semibold pb-2 ${activeTab === "location" ? "border-b-4 border-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("location")}
            >
              Location
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-600">{event.description}</p>

            {/* Tags for Category, Event Type, and Age Restriction */}
            <div className="flex flex-wrap gap-2 mt-2">
              {event.category?.name && (
                <span className="bg-gray-200  text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category.name}
                </span>
              )}
              {event.eventType && (
                <span className="bg-gray-200  text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {event.eventType}
                </span>
              )}
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                {event.ageRestriction || "All Ages"}
              </span>
      </div>

      <p className="text-gray-600 mt-2"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
      <p className="text-gray-600"><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
      <p className="text-gray-600 mt-2"><strong>Start Time:</strong> {event.startTime}</p>
      <p className="text-gray-600"><strong>End Time:</strong> {event.endTime}</p>

      {/* Entry Fee Section */}
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <p className="text-2xl font-bold text-black">Entry Fee:</p>
        <p className="text-2xl text-gray-700">Rs {event.pricing}</p>
      </div>
    </div>
  )}

  {activeTab === "location" && (
    <div>
      <p className="text-gray-600"><strong>Location:</strong> {event.location?.name || "Not specified"}</p>
      <p className="text-gray-600"><strong>Gallery's Address:</strong> {event.galleryAddress || "Not specified"}</p>
    </div>
  )}
</div>

        </div>

      </div>
    </div>
  );
};

export default SingleEventDetail;
