import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css'
import { useHistory } from "react-router-dom";
import {login, useAuth} from "../../services/authentication"



export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const history = useHistory();
  const [logged] = useAuth();

  function validate(){
    return username.length > 0 && password.length > 0;
  }

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          login(token)
          console.log(token)
          localStorage.setItem('user', username)          
        }
        else {
          console.log("Please type in correct username/password")
        }
      })

      
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="Login">
      {!logged ? <div>
      <h2 className="log">Login</h2>
      <Form onSubmit={onSubmitClick}>
          <Form.Group controlId="user">
            <Form.Label>Username</Form.Label>
            <Form.Control autoFocus type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Button type="submit" disabled={!validate()}>
            Submit
          </Button>
      </Form>
      </div>:
      <Redirect to='/'/>}
    </div>
  )
}