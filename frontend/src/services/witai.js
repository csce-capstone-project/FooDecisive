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
        if(response.intents.length > 0){
          console.log(response)
          let intent = response.intents[0]['name']
          let message = responses[intent]
          if(intent == 'search'){
            if(response.entities['wit$location:location']){
              let location = response.entities['wit$location:location'][0]['value']
              return yelpREST.search(response.entities['wit$search_query:search_query'][0]['value'],location,'best_match').then(response =>{
                message = message.replace('#',location)
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
        }
      })
    }
};
