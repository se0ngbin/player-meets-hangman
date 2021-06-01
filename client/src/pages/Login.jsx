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
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="navbar">
          <img src={Logo} alt="" height="30" className="logo"></img>
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
          <Link to="/">
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Link>
          <Link to="/createaccount">Create a new account</Link>
        </Form>
      </div>
    </div>
  );
}