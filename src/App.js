import React from "react";
import Navbar from "./components/Navbar/Navebar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import Posts from "./components/pages/Posts";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}  />
          <Route path="/categories" exact component={Categories} />
          <Route path="/posts" exact component={Posts} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
