import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripcardItem from './components/UserTripcardItem';
import { db } from '@/service/firebaseConfig';

const MyTrips = () => {
  const navigate = useNavigate(); // Corrected hook name
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'AITrips'),
      where('userEmail', '==', user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });
    });

    setUserTrips(trips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.length > 0
          ? userTrips.map((trip) => (
              <UserTripcardItem key={trip.id} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              />
            ))}
      </div>
    </div>
  );
};

export default MyTrips;
