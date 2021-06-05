/*
Code taken from 
https://serverless-stack.com/chapters/create-a-login-page.html
Refer to the website to connect to other parts
*/


import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Logo from '../assets/logo.png'
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";



export default function Login({ setAuth, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = { username: email, password: password };
      const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
      });
      let result = await response.json();
      
      console.log(result);
      if (result.accessToken) {
          localStorage.setItem("token", result.accessToken);
        
          const decoded = jwt_decode(result.accessToken);
          localStorage.setItem("username", decoded.username);
          setAuth(true, email);

          console.log("login successfully!");
          history.push('/');
      } else {
        setAuth(false);
        console.log(result.status);
        console.log("nope... suck it up and start debugging again");
      }
  } catch (err) {
      console.error("sign in", err);
  }

  }

  return (
    <div>
      <div className="navbar">
          <a href="/"><img src={Logo} alt="" height="30" className="logo"></img></a>
      </div>
      <h3 className="mt-5">Log In</h3>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group role="form">
            <Button className="button" variant="info" block size="lg" type="submit" 
              disabled={!validateForm()}>
                Log In
            </Button>
          </Form.Group>  
          <Link to="/createaccount" className="link">Create a new account</Link>
        </Form>
      </div>
    </div>
  );
}