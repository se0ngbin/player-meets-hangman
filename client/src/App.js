import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

class App extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({ response });
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/createaccount" component={CreateAccount} />
          </Switch>
        </Router>  
        <h1>{this.state.response.body}</h1>
      </div>
    );
  }
}

export default App;
