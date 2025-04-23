import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { GetplaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (trip && trip.userSelection?.location?.label) {
      fetchPlacePhoto();
    }
  }, [trip]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const resp = await GetplaceDetails(data);
      const photoName = resp?.data?.places?.[0]?.photos?.[3]?.name;
      if (photoName) {
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        setPhotoUrl('/placeholder.jpg');
        setIsImageLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
      setPhotoUrl('/placeholder.jpg');
      setIsImageLoaded(true);
    }
  };

  const handleNavigateToPlace = () => {
    const location = trip?.userSelection?.location?.label;
    if (!location) {
      alert("Location not available.");
      return;
    }
  
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };
  

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="relative">
        <img
          src={photoUrl}
          alt="Destination"
          className={`h-100 w-full object-cover transition-all duration-300 hover:scale-[1.02] ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setPhotoUrl('/placeholder.jpg');
            setIsImageLoaded(true);
          }}
        />
      </div>
      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold text-gray-800">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1 rounded-full">
              🗓️ {trip?.userSelection?.noOfDays} Day
            </span>
            <span className="bg-green-100 text-green-600 text-sm font-medium px-4 py-1 rounded-full">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-4 py-1 rounded-full">
              🥂 Travelers: {trip?.userSelection?.traveler}
            </span>
          </div>
        </div>
        <Button
             className="rounded-full p-4 shadow-md hover:scale-105 transition-transform cursor-pointer"
               onClick={handleNavigateToPlace}
              >
              <IoIosSend className="text-xl" />
                </Button>

      </div>
    </div>
  );
};

export default InfoSection;
