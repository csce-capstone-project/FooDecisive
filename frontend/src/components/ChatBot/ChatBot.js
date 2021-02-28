import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ChatBot.css'
import { witaiREST } from '../../services/witai';

require('dotenv').config()
const { REACT_APP_WIT_AI_API_KEY } = process.env;


const API_KEY = REACT_APP_WIT_AI_API_KEY

export function ChatBot(){
  const [query, setQuery] = useState('')

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
      document.getElementById("intent").innerHTML = `Intent: ${intent}`
      if(intent === 'search'){
        let entities = response.entities
        console.log(entities['wit$location:location'])
        if('wit$location:location' in entities){
          let entity = entities['wit$location:location'][0].body
          document.getElementById("location").innerHTML = `Location: ${entity}`
        }
        else{
          document.getElementById("location").innerHTML = ''
        }
        if('sortBy:sortBy' in entities){
          let entity = entities['sortBy:sortBy'][0].body
          document.getElementById('sortBy').innerHTML = `SortBy: ${entity}`
        }
        else{
          document.getElementById('sortBy').innerHTML = ''
        }
        if('wit$search_query:search_query' in entities){
          let entity = entities['wit$search_query:search_query'][0].body
          document.getElementById('searchQuery').innerHTML = `Search query: ${entity}`
        }
        else{
          document.getElementById('searchQuery').innerHTML = ''
        }
      }
      else{
        document.getElementById("location").innerHTML = ''
        document.getElementById('sortBy').innerHTML = ''
        document.getElementById('searchQuery').innerHTML = ''
      }
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
      <p id="intent"></p>
      <p id="location"></p>
      <p id="sortBy"></p>
      <p id="searchQuery"></p>
    </div>

  )
}
