import axios from 'axios';

// Testing purposes: Put in your API key
let API_KEY = ""

export const yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-type": "application/json",
    }
  });