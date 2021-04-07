// import axios from 'axios';

// // Testing purposes: Put in your API key
// let API_KEY = ""

// export const yelpREST = axios.create({
//     baseURL: "https://api.yelp.com/v3/",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-type": "application/json",
//     }
//   });

require('dotenv').config()
const { REACT_APP_YELP_API_KEY } = process.env;


const API_KEY = REACT_APP_YELP_API_KEY



export const yelpREST = {
// method used to retrieve search results from Yelp API
    search (term, location, sortBy){
      return fetch(`https://fathomless-retreat-96098.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant+${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
          if(jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count,
                latitude: business.coordinates.latitude,
                longitude: business.coordinates.longitude
              };
            });
          }
      });
    },
    searchLatLon (term, latitude, longitude, sortBy){
      return fetch(`https://fathomless-retreat-96098.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant+${term}&latitude=${latitude}&longitude=${longitude}&sort_by=${sortBy}`,
      {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
          if(jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count,
                latitude: business.coordinates.latitude,
                longitude: business.coordinates.longitude
              };
            });
          }
      });
    }
};



export const yelpBusID = {
  // method used to retrieve search results from Yelp API
      searchByID (id){
        return fetch(`https://fathomless-retreat-96098.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        {
          headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
          },
        }).then(response => {
          return response.json();
        }).then(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count,
                latitude: business.coordinates.latitude,
                longitude: business.coordinates.longitude
              };
        });
      }
  };
