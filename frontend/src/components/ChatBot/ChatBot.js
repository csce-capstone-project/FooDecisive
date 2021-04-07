import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ChatBot.css'
import { witaiREST } from '../../services/witai';
import { List } from '../RestaurantDetail/List'
import { yelpREST } from '../../services/yelp';

require('dotenv').config()
const { REACT_APP_WIT_AI_API_KEY } = process.env;


const API_KEY = REACT_APP_WIT_AI_API_KEY

export function ChatBot(){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  function validate(){
    return query.length > 0;
  }

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed submit")
    let parameter = encodeURIComponent(query.trim())
    witaiREST.chat(parameter).then(response=>{
      return JSON.parse(response);
    }).then(response =>{
      let intent = response.intents[0].name
      if(intent == "search"){
        console.log(response);
        console.log(response.entities['wit$search_query:search_query'][0]['value']);
        console.log(response.entities['wit$location:location'][0]['value']);
        searchYelp(response.entities['wit$search_query:search_query'][0]['value'],response.entities['wit$location:location'][0]['value'],'best_match');
      }
    })
  }

  function searchYelp(term, location, sortBy) {
      yelpREST.search(term, location, sortBy).then(businesses => {
          console.log(businesses)
          setResults(businesses)
        })
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="ChatBot">
      <Form onSubmit={onSubmitClick}>
        <Form.Group controlId="query">
          <Form.Label>Query</Form.Label>
          <Form.Control autoFocus type="text" placeholder="Query" value={query} onChange={handleQueryChange} />
        </Form.Group>
        <Button type="submit" disabled={!validate()}>
          Submit
        </Button>
      </Form>
      <List businesses={results}/>
    </div>

  );
}
