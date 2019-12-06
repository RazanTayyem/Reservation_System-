import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/login";
import Calendar from "./components/Calendar";
import BookEvent from "./components/BookEvent";
import DetailsEvent from "./components/DetailsEvent";
import HomePage from "./components/HomePage";
import Error from "./components/Error";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/events-calendar/:id" component={Calendar} />
          <Route exact path="/bookevent/:serviceId" component={BookEvent} />
          <Route exact path="/detailsevent" component={DetailsEvent} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/home" component={HomePage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
