import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetplaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const PlacesToVisit = ({ trip }) => {
  const [photoUrls, setPhotoUrls] = useState({});
  

  useEffect(() => {
    const fetchPhotos = async () => {
      const slots = ['morning', 'afternoon', 'evening'];

      for (const day of trip.tripData?.itinerary || []) {
        for (const slot of slots) {
          const activity = day[slot];
          if (activity && activity.place_name && !photoUrls[activity.place_name]) {
            try {
              const data = { textQuery: activity.place_name };
              const resp = await GetplaceDetails(data);

              // Check if photo exists
              const photoName = resp.data?.places?.[0]?.photos?.[3]?.name;

              if (photoName) {
                setPhotoUrls((prev) => ({
                  ...prev,
                  [activity.place_name]: PHOTO_REF_URL.replace('{NAME}', photoName),
                }));
              } else {
                setPhotoUrls((prev) => ({
                  ...prev,
                  [activity.place_name]: '/placeholder.jpg', 
                }));
              }
            } catch (err) {
              console.error("Error fetching photo:", err);
              setPhotoUrls((prev) => ({
                ...prev,
                [activity.place_name]: '/placeholder.jpg', 
              }));
            }
          }
        }
      }
    };

    fetchPhotos();
  }, [trip]);

  const formatTimeSlot = (slotName) =>
    slotName.replace(/_/g, ' ').replace(/^./, (str) => str.toUpperCase());

  const timeSlots = ['morning', 'afternoon', 'evening'];

  return (
    <div>
      <h2 className='font-bold text-lg mt-4'>Places to Visit</h2>
      {trip.tripData?.itinerary.map((day, dayIndex) => (
        <div key={dayIndex} className='mt-6'>
          <h3 className='text-xl font-semibold mb-2'>
            {`Day ${dayIndex + 1}`}
          </h3>

          {timeSlots.map((slot) => {
            const activity = day[slot];
            if (!activity) return null;

            const photoUrl = photoUrls[activity.place_name] || '/placetovisit.png';

            return (
              <motion.div
                key={`${dayIndex}-${slot}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  delay: dayIndex * 0.1 + slot.length * 0.05,
                }}
              >
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${activity.place_name}`}
                  target='_blank'
                >
                  <div className='flex flex-col md:flex-row gap-4 items-start border border-gray-300 rounded-xl shadow-md p-4 mb-4 hover:scale-105 transition-all cursor-pointer'>
                    {/* Left: Image */}
                    <img
  src={photoUrl}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/placetovisit.png';
  }}
  alt={activity.place_name || 'No image available'}
  className='w-full md:w-60 h-40 object-cover rounded-lg'
/>


                    {/* Right: Details */}
                    <div className='flex-1'>
                      <h4 className='text-lg font-semibold text-gray-800'>
                        {formatTimeSlot(slot)} – {activity.place_name}
                      </h4>
                      <p className='text-sm text-gray-500 italic'>{activity.best_time_to_visit}</p>
                      <p className='text-sm mt-2 text-gray-600'>{activity.place_details}</p>
                      <p className='text-sm mt-2 text-gray-600'>
                        <strong>🎟️Tickets:</strong> {activity.ticket_pricing}
                      </p>
                      <p className='text-sm text-gray-600'>
                        <strong>⏳Time needed:</strong> {activity.time_needed}
                      </p>
                      <Button className='size-sm bg-green-500 text-white hover:bg-green-600'>
                        <FaMapLocationDot />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
