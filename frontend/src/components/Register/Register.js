import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Register.css'

export function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");


  function validate(){
    return user.length > 0 && pass.length > 0;
  }

  function handleSubmit(event){

    fetch('/api/register', {
    method: 'POST',
    headers: {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: user,
        password: pass,
    })
    }).then(res => res.json())
      .then(mess => console.log(mess))

    setUser('');
    setPass('');

    event.preventDefault();
  }

  return(
    <div className="Login">
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="user">
            <Form.Label>Username</Form.Label>
            <Form.Control autoFocus type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </Form.Group>
          <Button type="submit" disabled={!validate()}>
            Submit
          </Button>
      </Form>
    </div>
  );
}