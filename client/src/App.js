import React from "react";
import { withRouter } from "react-router";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

const App = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/createaccount" component={CreateAccount}/>
      </Switch>
    </Router>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>{!data ? "Loading..." : data}</p>
  //     </header>
  //   </div>
  // );
}

export default App;
