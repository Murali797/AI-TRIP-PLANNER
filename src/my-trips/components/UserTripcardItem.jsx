import React, {useState, useEffect} from 'react'
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetplaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripcardItem = ({trip}) => {
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
  
  return (
    <Link to={`/view-trip/${trip?.id}`}>
    <div className="shadow-lg rounded-2xl hover:scale-105 transition-all w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-3 py-3">
      

          <img
          src={photoUrl}
          alt="Destination"
          className={`object-cover rounded-xl w-full h-48 sm:h-56 md:h-64 lg:h-72${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setPhotoUrl('/placeholder.jpg');
            setIsImageLoaded(true);
          }}
        />


      <div className="mt-3">
        <h2 className="font-bold text-base sm:text-lg md:text-xl truncate">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-xs sm:text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget}
        </h2>
      </div>
    </div>
  </Link>
  
  )
}

export default UserTripcardItem
