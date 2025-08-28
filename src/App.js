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
import { NewsContextProvider } from "./context/NewsContext";

const App = () => {
  return (
    <NewsContextProvider>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <News category="general" />}
            />
            <Route
              path="/sports"
              exact
              component={() => <News category="sports" />}
            />
            <Route
              path="/business"
              exact
              component={() => <News category="business" />}
            />
            <Route
              path="/technology"
              exact
              component={() => <News category="technology" />}
            />
            <Route
              path="/science"
              exact
              component={() => <News category="science" />}
            />
            <Route
              path="/health"
              exact
              component={() => <News category="health" />}
            />
            <Route
              path="/entertainment"
              exact
              component={() => <News category="entertainment" />}
            />
            <Route
              path="/world"
              exact
              component={() => <News category="world" />}
            />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </NewsContextProvider>
  );
};

export default App;
