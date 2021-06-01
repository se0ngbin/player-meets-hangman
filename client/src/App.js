import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import BuildProfile from "./pages/BuildProfile";
import HangmanGame from "./pages/Hangman";


class App extends Component {
  state = {
    response: {}
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/hangmangame" component={HangmanGame} />
            <Route exact path="/createaccount" component={CreateAccount} />
            <Route exact path="/buildprofile" component={BuildProfile} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
