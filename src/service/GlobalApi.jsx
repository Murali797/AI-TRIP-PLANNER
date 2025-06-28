import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.displayName,places.photos,places.id', // ✅ make it a string, not an array
  }
};

export const GetplaceDetails = (data) => {
  // 🔍 expected format: { textQuery: "Paris" }
  if (!data?.textQuery) {
    throw new Error("textQuery is required");
  }

  return axios.post(BASE_URL, { textQuery: data.textQuery }, config);
};

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
