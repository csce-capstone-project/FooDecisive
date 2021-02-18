import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ChatBot.css'

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
    fetch(`https://api.wit.ai/message?v=20210218&q=${parameter}`,{
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    }).then(response=>response.json())
    .then(response => console.log(JSON.stringify(response)))
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
    </div>
  )
}
