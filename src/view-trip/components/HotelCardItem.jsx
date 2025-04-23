import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REF_URL } from '@/service/GlobalApi'
import { GetplaceDetails } from '@/service/GlobalApi'
const HotelCardItem = ({hotel}) => {

     const [photoUrl, setPhotoUrl] = useState()
     const [isImageLoaded, setIsImageLoaded] = useState(false)
    
      useEffect(() => {
        hotel&&GetPlacePhoto()
    
      },[hotel])
    
      const GetPlacePhoto = async() => {
        const data = {
          textQuery: hotel?.hotel_name
        }
        try {
              const resp = await GetplaceDetails(data);
              const photoName = resp?.data?.places?.[0]?.photos?.[3]?.name;
              if (photoName) {
                const url = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(url);
              } else {
                setPhotoUrl('/hotel.png');
                setIsImageLoaded(true);
              }
            } catch (error) {
              console.error("Error fetching photo:", error);
              setPhotoUrl('/hotel.png');
              setIsImageLoaded(true);
            }
      }
  return (
    <div>
       <Link 
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name},${hotel?.hotel_address}`} 
            target='_blank'
            key={hotel?.hotel_name}  
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
            <img
          src={photoUrl}
          alt="Destination"
          className={`h-64 w-full object-cover transition-all duration-300 hover:scale-[1.02] rounded-2xl ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setPhotoUrl('/hotel.png');
            setIsImageLoaded(true);
          }}
        />
              <div className="my-2 flex flex-col gap-1 h-[150px] shadow-sm rounded-2xl">
                <h2 className="font-medium">{hotel?.hotel_name}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotel_address}</h2>
                <h2 className="text-sm">💰 {hotel?.price_per_night}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        
    </div>
  )
}

export default HotelCardItem
