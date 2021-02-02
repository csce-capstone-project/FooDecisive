import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css'

export function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");


  function validate(){
    return user.length > 0 && pass.length > 0;
  }

  function handleSubmit(event){
    console.log(user);
    console.log(pass);
    event.preventDefault();
  }

  return(
    <div className="Login">
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="user">
            <Form.Label>Username</Form.Label>
            <Form.Control autofocus type="text" value={user} onChange={(e) => setUser(e.target.value)} />
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
