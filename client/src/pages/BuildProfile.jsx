import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Logo from '../assets/logo.png'
import { useHistory } from 'react-router-dom';


export default function BuildProfile({setAuth}) {
  const history = useHistory();
  const [flname, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [genderPref, setGenderPref] = useState("2");
  const [funFact, setFunFact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name: flname, birthdate: age, bio: bio, gender: gender, 
        gendersinterestedin: genderPref};
      const response = await fetch("http://localhost:3001/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("token") },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        console.log("profile built successfully"); 
        setAuth(true);
        history.push('/');
      } else {
        console.log(response.status);
        console.log("nope... suck it up and start debugging again");
        setAuth(false);
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
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="pic">
            <Form.File id="pic" label="Profile Picture" />
          </Form.Group>
          <Form.Group size="lg" controlId="flname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              value={flname}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="age">
            <Form.Label>Birthdate (YYYY-MM-DD)</Form.Label>
            <Form.Control
              autoFocus
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              as="select" custom
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">M2F Transsexual</option>
              <option value="3">F2M Transsexual</option>
              <option value="4">Non-binary</option>
              <option value="5">Not applicable</option>
            </Form.Control>
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
            <Form.Label>Which genders are you interested in?</Form.Label>
            <Form.Control 
              as="select" custom
              value={genderPref}
              onChange={(e) => setGenderPref(e.target.value)}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">M2F Transsexual</option>
              <option value="3">F2M Transsexual</option>
              <option value="4">Non-binary</option>
              <option value="5">Not applicable</option>
            </Form.Control>
          </Form.Group>
          <Form.Group size="lg" controlId="funFact">
            <Form.Label>One interesting thing about yourself</Form.Label>
            <Form.Control
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
            />
          </Form.Group>
          <Form.Group role="form">
            <Button className="button" variant="info" block size="lg" type="submit">
              Start Matching!
            </Button>
          </Form.Group> 
        </Form>
      </div>
    </div>
  );
}