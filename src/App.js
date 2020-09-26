import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MachineList from "views/MachineList/MachineList";
import Machine from "views/Machine/Machine";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MachineList />
        </Route>
        <Route path="/machine/:machineId">
          <Machine />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
