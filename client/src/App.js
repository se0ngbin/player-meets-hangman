import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import HangmanGame from "./pages/Hangman";
import Landing from "./pages/Landing"


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
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/hangmangame" component={HangmanGame} />
            <Route exact path="/createaccount" component={CreateAccount} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
