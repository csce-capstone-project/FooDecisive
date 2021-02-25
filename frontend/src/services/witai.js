require('dotenv').config()
const { REACT_APP_WIT_AI_API_KEY } = process.env;


const API_KEY = REACT_APP_WIT_AI_API_KEY

export const witaiREST = {
    chat(query){
      return fetch(`https://api.wit.ai/message?v=20210218&q=${query}`,{
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }).then(response=>response.json())
      .then(response => {
        if(response.intents){
          return(JSON.stringify(response));
        }
      })
    }
};
