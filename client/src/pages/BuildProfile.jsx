import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';


export default function BuildProfile() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [genderPref, setGenderPref] = useState("");
  const [funFact, setFunFact] = useState("");



  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="navbar">
          <img src={Logo} alt="" height="30" className="logo"></img>
      </div>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              autoFocus
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="genderPref">
            <Form.Label>Whoa are you interested in?</Form.Label>
            <Form.Control
              value={genderPref}
              onChange={(e) => setGenderPref(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="funFact">
            <Form.Label>One interesting thing about yourself</Form.Label>
            <Form.Control
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
            />
          </Form.Group>
          <Link to="/">
            <Button className="button" block size="lg" type="submit">
                Start Matching!
            </Button>
          </Link>
          
        </Form>
      </div>
    </div>
  );
}