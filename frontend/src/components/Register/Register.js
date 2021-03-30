import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Register.css'
import Container from "@material-ui/core/Container";


export function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // const [userActive, setActive] = useState(false);
  const history = useHistory();

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
      .then(history.push('/login'))

    // setUser('');
    // setPass('');

    event.preventDefault();

  }

  return(
    <Container style={{margin: '0', position: 'absolute', top: '30%', left: '40%', maxWidth: '500px'}}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="user">
            <Form.Label>Username</Form.Label>
            <Form.Control autoFocus type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="8 characters, an uppercase, and a special character" value={pass} onChange={(e) => setPass(e.target.value)} />
          </Form.Group>
          <Button type="submit" style={{backgroundColor: 'orange'}} disabled={!validate()}>
            Submit
          </Button>
      </Form>
    </Container>
  );
}