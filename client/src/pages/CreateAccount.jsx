import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }


  async function handleSubmit(event) {
    const tEmail = "vanessatu@g.ucla.edu";
    const tPW = "vanessapassword";
    const body = {
        username: tEmail,
        password: tPW,
    }

    try{
        const response = await fetch("http://localhost:3001/createLogin", {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (response.ok) {
            console.log("account created successfully");
            console.log(response.json());
        } else {
            console.log(response.status);
        }
        return response.ok;
    } catch (err) {
        console.error("create Account", err);
        return err.status;
    }

    //POST /createLogin
    
  }

    useEffect(() => {
        handleSubmit();
    }, []);

  return (
    <div>
      <div className="navbar">
          <img src={Logo} alt="" height="30" className="logo"></img>
      </div>
      <h3 className="mt-5">Create a New Account</h3>
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
          <Link to="/buildprofile">
            <Button className="button" variant="info" block size="lg" type="submit" disabled={!validateForm()}>
                Sign Up
            </Button>
          </Link>
          <Link to="/login" className="link">I have an account</Link>
        </Form>
      </div>
    </div>
  );
}