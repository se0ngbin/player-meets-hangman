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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  // const setAuth = (boolean, username) => {
  //   setIsAuthenticated(boolean);
  //   setCurrentUser(username);
  // }

    return (
      <div className="App">
        <Fragment>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => isAuthenticated ? 
                          (<Homepage {...props} setAuth={setIsAuthenticated} currentUser={currentUser} />) : (<Redirect to="/landing" />)}/>
              <Route exact path="/login" render={(props) => !isAuthenticated ? 
                          (<Login {...props} setAuth={setIsAuthenticated} setUser={setCurrentUser} />) : (<Redirect to="/" />)}/>
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/hangmangame" component={HangmanGame} />
              <Route exact path="/profile" render={() => (<Profile currentUser={currentUser}/>)} />
              <Route exact path="/buildprofile" render={(props) => (<BuildProfile {...props} setAuth={setIsAuthenticated}/>)} />
              <Route exact path="/createaccount" render={(props) => (<CreateAccount {...props} setAuth={setIsAuthenticated}/>)}/>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
}

export default App;
