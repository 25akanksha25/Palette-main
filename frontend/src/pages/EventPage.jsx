// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllEvents } from "../store/event/eventSlice";
// import backgroundImg from "../assets/eventHeader3.gif";
// import { toast } from "react-toastify";

// const EventPage = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { events, isLoading, isError, message } = useSelector((state) => state.event);

//   const [eventData, setEventData] = useState([]);

//   useEffect(() => {
//     dispatch(getAllEvents());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Array.isArray(events)) {
//       setEventData(events);
//     } else if (isError) {
//       toast.error(message);
//     }
//   }, [events, isError, message]);

//   const now = new Date();
//   const currentEvents = eventData.filter(
//     (event) => new Date(event.startDate) <= now && new Date(event.endDate) >= now
//   );  
//   const pastEvents = eventData.filter((event) => new Date(event.endDate) < now);
//   const upcomingEvents = eventData.filter((event) => new Date(event.startDate) > now);

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center">
//         <div className="relative w-full h-[600px]">
//           <img src={backgroundImg} alt="Event Background" className="object-cover w-full h-full" />
//         </div>
//       </div>

//       <div className="flex justify-between items-center px-10 py-10">
//         <div className="max-w-2xl">
//           <h2 className="text-5xl font-extrabold text-gray-900 mb-4 italic leading-tight">
//             "Experience, Explore, Engage!"
//           </h2>
//           <div className="w-24 h-1 bg-black mb-4"></div>
//           <p className="text-lg text-gray-700">
//             Discover the most exciting fairs, exhibitions, and events happening around you.
//             Whether you're an art lover, a creator, or just looking for something new, there's an event waiting for you!
//           </p>
//         </div>

//         {user?.userType === "seller" && (
//           <Link to="/create-event">
//             <button className="border-2 border-black px-6 py-3 rounded-xl text-lg font-semibold text-black hover:text-white hover:bg-black transition duration-300 shadow-md">
//               + Register Your Event Here
//             </button>
//           </Link>
//         )}
//       </div>

//       <h3 className="text-5xl font-bold italic px-10 mb-6">Current Events</h3>
//       <div className="grid grid-cols-2 gap-6 px-10">
//         {currentEvents.length > 0 ? (
//           currentEvents.map((event) => (
//             <div
//               key={event._id}
//               className="cursor-pointer relative group"
//               onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
//             >
//               <div className="relative">
//                 <img src={event.eventImage} alt={event.title} className="w-full h-60 object-cover rounded-md" />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all"></div>
//                 <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-lg px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
//                   Explore Event
//                 </div>
//               </div>
//               <h4 className="text-xl font-bold mt-2">{event.title}</h4>
//               <p className="text-gray-600 mb-6">
//                 📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-2">No current events available.</p>
//         )}
//       </div>

//       <div className="flex justify-between px-10 mt-10">
//         {/* Past Events */}
//         <div className="w-1/2">
//           <h3 className="text-3xl font-bold mb-6">Past Events</h3>
//           {pastEvents.length > 0 ? (
//             pastEvents.map((event) => (
//               <div
//                 key={event._id}
//                 className="flex items-center space-x-4 p-4 border-b cursor-pointer hover:bg-gray-100"
//                 onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
//               >
//                 <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <h4 className="text-xl font-semibold">{event.title}</h4>
//                   <p className="text-gray-600">
//                     📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No past events available.</p>
//           )}
//         </div>

//         {/* Upcoming Events */}
//         <div className="w-1/2">
//           <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
//           {upcomingEvents.length > 0 ? (
//             upcomingEvents.map((event) => (
//               <div
//                 key={event._id}
//                 className="flex items-center space-x-4 p-4 border-b cursor-pointer hover:bg-gray-100"
//                 onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
//               >
//                 <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <h4 className="text-xl font-semibold">{event.title}</h4>
//                   <p className="text-gray-600">📅 {new Date(event.startDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No upcoming events available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventPage;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/event/eventSlice";
import backgroundImg from "../assets/eventHeader3.gif";
import { toast } from "react-toastify";

const EventPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector((state) => state.event);

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(events)) {
      setEventData(events);
    } else if (isError) {
      toast.error(message);
    }
  }, [events, isError, message]);

  const now = new Date();
  const currentEvents = eventData.filter(
    (event) => new Date(event.startDate) <= now && new Date(event.endDate) >= now
  );  
  const pastEvents = eventData.filter((event) => new Date(event.endDate) < now);
  const upcomingEvents = eventData.filter((event) => new Date(event.startDate) > now);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[600px]">
          <img src={backgroundImg} alt="Event Background" className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="flex justify-between items-center px-10 py-10">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 italic leading-tight">
            "Experience, Explore, Engage!"
          </h2>
          <div className="w-24 h-1 bg-black mb-4"></div>
          <p className="text-lg text-gray-700">
            Discover the most exciting fairs, exhibitions, and events happening around you.
            Whether you're an art lover, a creator, or just looking for something new, there's an event waiting for you!
          </p>
        </div>

        {user?.userType === "seller" && (
          <Link to="/create-event">
            <button className="border-2 border-black px-6 py-3 rounded-xl text-lg font-semibold text-black hover:text-white hover:bg-black transition duration-300 shadow-md">
              + Register Your Event Here
            </button>
          </Link>
        )}
      </div>

      <h3 className="text-5xl font-bold italic px-10 mb-6">Current Events</h3>
      <div className="grid grid-cols-2 gap-6 px-10">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <div
              key={event._id}
              className="cursor-pointer relative group"
              onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
            >
              <div className="relative">
                <img src={event.eventImage} alt={event.title} className="w-full h-60 object-cover rounded-md" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all"></div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-lg px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Event
                </div>
              </div>
              <h4 className="text-xl font-bold mt-2">{event.title}</h4>
              <p className="text-gray-600 mb-6">
                📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No current events available.</p>
        )}
      </div>

      <div className="flex justify-between px-10 mt-10">
        {/* Past Events */}
        <div className="w-1/2">
          <h3 className="text-3xl font-bold mb-6">Past Events</h3>
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between space-x-4 p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
              >
                <div className="w-16 h-16">
                  <img src={event.eventImage} alt={event.title} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold">{event.title}</h4>
                  <p className="text-gray-600">
                    📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-2xl text-gray-600">➔</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No past events available.</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="w-1/2">
          <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between space-x-4 p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => (window.location.href = `/single-event-detail/${event._id}`)}
              >
                <div className="w-16 h-16">
                  <img src={event.eventImage} alt={event.title} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold">{event.title}</h4>
                  <p className="text-gray-600">📅 {new Date(event.startDate).toLocaleDateString()}</p>
                </div>
                <span className="text-2xl text-gray-600">➔</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
