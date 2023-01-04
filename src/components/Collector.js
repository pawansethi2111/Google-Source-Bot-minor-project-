import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import "./universal/universal.css";
import ChatShell from "./ChatShell/ChatShell";
import ReactGA from "react-ga";

ReactGA.initialize("UA-209783951-1");

const Collector = () => {

  return (
    <Router>
      <div className="flex flex-col" style={{backgroundColor:'white'}}>
        <Route
          render={(props) => (
            <div
              className={
                "md:mt-10"
              }
            >
              <Switch>
                <Route exact path="/recruiting">
                  <Redirect to="/recruiting/fellowbot" />
                </Route>
                <Route
                  path={["/recruiting/fellowbot", "/recruiting/sourcingbot", "/recruiting/techbot"]}
                  component={ChatShell}
                />
              </Switch>
            </div>
          )}
        />
      </div>
    </Router>
  );
};

export default Collector;
