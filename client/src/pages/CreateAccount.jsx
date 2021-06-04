import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';

const CreateAccount = ({setAuth} ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username: email, password: password };
      const response = await fetch("http://localhost:3001/createLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      
      console.log(result);
      if (result.accessToken) {
        localStorage.setItem("token", result.accessToken);
        console.log("account created successfully"); 
        setAuth(true, email);
        history.push('/buildprofile');
      } else {
        setAuth(false);
        console.log(result.status);
        console.log("nope... suck it up and start debugging again");
      }
    }
    catch (err) 
    {
      console.error("create Account", err);
      return err.status;
    }
  };
  
  return (
    <div>
      <div className="navbar">
          <img src={Logo} alt="" height="30" className="logo"></img>
      </div>
      <h3 className="mt-5">Create a New Account</h3>
      <div className="Login">
        <Form onSubmit={handleSubmit} action="#">
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
                  Sign Up
              </Button>
          </Form.Group>          
          <Link to="/login" className="link">I have an account</Link>
        </Form>
      </div>
    </div>
  ); 
};

export default CreateAccount;