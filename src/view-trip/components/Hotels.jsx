import React from 'react';
import { motion } from 'framer-motion'; 

import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <motion.div
            key={hotel.id || index}
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{
              duration: 0.4,
              delay: index * 0.1, 
              type: 'spring', 
              stiffness: 100, 
            }}
          >
            <HotelCardItem hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
