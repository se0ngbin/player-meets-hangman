import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import HangmanGame from "./pages/Hangman";
import Landing from "./pages/Landing"
import BuildProfile from "./pages/BuildProfile"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
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
              <Route exact path="/buildprofile" component={BuildProfile} />
              <Route exact path="/createaccount" render={(props) => (<CreateAccount {...props} setAuth={setAuth}/>)}/>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
}

export default App;
