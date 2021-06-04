import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import HangmanGame from "./pages/Hangman";
import Landing from "./pages/Landing"
import BuildProfile from "./pages/BuildProfile"
import Profile from "./pages/ProfilePage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const setAuth = (boolean, username = currentUser) => {
    setIsAuthenticated(boolean);
    setCurrentUser(username);
  };

    return (
      <div className="App">
        <Fragment>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => isAuthenticated ? 
                          (<Homepage {...props} setAuth={setAuth} />) : (<Redirect to="/landing" />)}/>
              <Route exact path="/login" render={(props) => !isAuthenticated ? 
                          (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}/>
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/hangmangame" component={HangmanGame} />
              <Route exact path="/profile" render={(props) => (<Profile {...props} currentuser={currentUser}/>)} />
              <Route exact path="/buildprofile" render={(props) => (<BuildProfile {...props} setAuth={setAuth}/>)} />
              <Route exact path="/createaccount" render={(props) => (<CreateAccount {...props} setAuth={setAuth}/>)}/>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
}

export default App;
