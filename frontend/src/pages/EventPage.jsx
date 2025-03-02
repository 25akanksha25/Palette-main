import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/event/eventSlice";
import backgroundImg from "../assets/eventHeader3.gif";
import { toast } from "react-toastify";

const EventPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event
  );

  const [eventData, setEventData] = useState([]);

  // Fetch all events when component loads
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  // Store events in local state when fetched
  useEffect(() => {
    if (Array.isArray(events)) {
      setEventData(events);
    } else if (isError) {
      toast.error(message);
    }
  }, [events, isError, message]);

  // Ensure only active events are shown
  const availableEvents = Array.isArray(eventData)
    ? eventData.filter((event) => new Date(event.endDate) >= new Date()) // Only show upcoming events
    : [];

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[600px]">
          <img
            src={backgroundImg}
            alt="Event Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-10 py-6">
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4">Fairs & Events</h2>
          <p className="text-lg text-gray-700">
            Welcome to our events page! Here, you can explore upcoming fairs,
            exhibitions, and special gatherings. Stay updated with the latest
            happenings, and be a part of the most exciting events around you.
          </p>
        </div>

        <div>
        {user?.userType === "seller" && (
          <Link to="/create-event">
            <button className="border-2 border-black p-3 rounded-xl text-lg text-black hover:text-white hover:bg-black">
              Add Event
            </button>
          </Link>
        )}
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-3 gap-6 px-10">
        {availableEvents.length > 0 ? (
          availableEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={event.eventImage}
                alt={event.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-black">{event.title}</h3>
                <p className="text-lg text-gray-700">{event.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {event.location?.name || "Location not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  📅 {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">💰 Rs {event.pricing}</p>

                <div className="mt-4">
                  <Link to={`/event-detail/${event._id}`}>
                    <button className="border-2 border-black rounded p-2 text-black hover:bg-black hover:text-white w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No upcoming events available.
          </p>
        )}
      </div>
    </div>
  );

};

export default EventPage;


