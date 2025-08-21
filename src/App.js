import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const pages = 12;
  const countryCode = "us";

  return (
    <div>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/">
              <News
                key="general"
                pageSize={pages}
                country={countryCode}
                category="general"
              />
            </Route>
            <Route exact path="/business">
              <News
                key="business"
                pageSize={pages}
                country={countryCode}
                category="business"
              />{" "}
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pageSize={pages}
                country={countryCode}
                category="entertainment"
              />
            </Route>
            <Route exact path="/health">
              <News
                key="health"
                pageSize={pages}
                country={countryCode}
                category="health"
              />
            </Route>
            <Route exact path="/science">
              <News
                key="science"
                pageSize={pages}
                country={countryCode}
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              <News
                key="sports"
                pageSize={pages}
                country={countryCode}
                category="sports"
              />
            </Route>
            <Route exact path="/technology">
              <News
                key="technology"
                pageSize={pages}
                country={countryCode}
                category="technology"
              />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
