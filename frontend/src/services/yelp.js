import axios from 'axios';

// Testing purposes: Put in your API key
let API_KEY = "119RzEse8oML9Oh8MB0jOJYQdFwn0fcZTRaE3YL86mi8QtgbUYYqakVqvmxz2OrmRw7UQAVrQ9DGg0-LtD-igubUoquBNC6_UJvLSz4uIPvyJh9o4E4dhMfv0lwsYHYx"

export const yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-type": "application/json",
      'Access-Control-Allow-Origin': 'http://localhost:3000/search/'
    }
  });