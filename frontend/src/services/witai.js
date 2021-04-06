import { yelpREST } from './yelp';

require('dotenv').config()
const { REACT_APP_WIT_AI_API_KEY } = process.env;
const responses = require('../responses.json');

const API_KEY = REACT_APP_WIT_AI_API_KEY

export const witaiREST = {
    chat(query, userLocation){
      return fetch(`https://api.wit.ai/message?v=20210218&q=${query}`,{
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }).then(response=>response.json())
      .then(response => {
        console.log(response)
        if(response.intents.length > 0){
          let intent = response.intents[0]['name']
          let message = responses[intent]
          let sortBy = 'best_match'
          if(response.entities['sortBy:sortBy']){
            sortBy = response.entities['sortBy:sortBy'][0]['value'].toLowerCase()
            let sortByOptions = {
                'best match': 'best_match',
                'highest rated': 'rating',
                'most reviewed': 'review_count'
            }
            sortBy = sortByOptions[sortBy]
          }
          if(intent == 'search'){
            let query = response.entities['wit$search_query:search_query'][0]['value']
            if(response.entities['wit$location:location'] && response.entities['wit$location:location'][0]['value'] != 'near me'){
              let location = response.entities['wit$location:location'][0]['value']
              return yelpREST.search(query,location,sortBy).then(response =>{
                message = message.replace('#',location)
                message = message.replace('%',query)
                return{
                  message:[{
                    type:"text",
                    content:message
                  }],
                  results:response
                }
              })
            }
            else{
              let query = response.entities['wit$search_query:search_query'][0]['value']
              return yelpREST.searchLatLon(query,userLocation.latitude,userLocation.longitude,sortBy).then(response =>{
                message = "Showing % near you."
                message = message.replace('%',query)
                return{
                  message:[{
                    type:"text",
                    content:message
                  }],
                  results:response
                }
              })
            }
          }
          else if(intent == "example"){
            return{
              message:[{
                type:"text",
                content:message
              }],
              results: []
            }
          }
          else if(intent == "goodbye"){
            return{
              message:[{
                type:"text",
                content:message
              }],
              results: []
            }
          }
          else if(intent == "greeting"){
            return{
              message:[{
                type:"text",
                content:message
              }],
              results: []
            }
          }
          else if(intent == "thanks"){
            return{
              message:[{
                type:"text",
                content:message
              }],
              results: []
            }
          }
        }
      })
    }
};
