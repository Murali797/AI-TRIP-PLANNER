export const SelectTravelList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'Solo escape into the unknown',
      icon: '✈︎',
      people: '1',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two hearts, one journey',
      icon: '🥂',
      people: '2 people',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'Adventures for all ages',
      icon: '🏡',
      people: '3 to 5 people',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'Thrills with your crew',
      icon: '🎢',
      people: '5 to 10 people',
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Smart spending, big memories',
      icon: '💰',
    },
    {
      id: 2,
      title: 'Comfort',
      desc: 'Balance value and experience',
      icon: '💵',
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Top-tier comfort, no limits',
      icon: '💎',
    },
  ];
  

export const AI_PROMPT = 'Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinate, ticket Pricing, Time travel each of the location for 2 days with each day plan with best time to visit in JSON format.  '