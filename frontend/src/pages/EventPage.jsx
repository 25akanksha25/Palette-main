import React from 'react';
import backgroundImg from '../assets/eventHeader3.gif'; 

const EventPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full h-[600px]">
                <img 
                    src={backgroundImg} 
                    alt="Event Background" 
                    className="object-cover w-full h-full"
                />
                {/* Content aligned to the left */}
                {/* <div className="absolute inset-0 flex items-center bg-black bg-opacity-50 p-10">
                    <div className="text-left max-w-lg">
                        <h1 className="text-4xl font-bold text-white mb-4">Discover and Create Events</h1>
                        <p className="text-white mb-6">
                            Join us in celebrating art, culture, and creativity. Explore upcoming events, connect with artists, and showcase your own creations.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Add an Event
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default EventPage;
