import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const [countryCode, setCountryCode] = useState("in");
  const [country, setCountry] = useState("India");
  const [languageCode, setLanguageCode] = useState("en");
  const [language, setLanguage] = useState("English");
  const [query, setQuery] = useState("");

  const pages = 15;

  const onCountryChange = (code, name) => {
    setCountryCode(code);
    setCountry(name);
  };

  const onLanguageChange = (code, lang) => {
    setLanguageCode(code);
    setLanguage(lang);
  };
  const onSearchHandler = (q) => {
    setQuery(q);
  };

  return (
    <div>
      <Router>
        <Navbar
          countryName={country}
          language={language}
          onCountryChange={onCountryChange}
          onLanguageChange={onLanguageChange}
          onSearch={onSearchHandler}
        />
        <main>
          <Switch>
            <Route exact path="/">
              <News
                key="general"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="general"
                query={query}
              />
            </Route>
            <Route exact path="/business">
              <News
                key="business"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="business"
                query={query}
              />{" "}
            </Route>
            <Route exact path="/technology">
              <News
                key="technology"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="technology"
                query={query}
              />
            </Route>
            <Route exact path="/science">
              <News
                key="science"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="science"
                query={query}
              />
            </Route>
            <Route exact path="/health">
              <News
                key="health"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="health"
                query={query}
              />
            </Route>

            <Route exact path="/sports">
              <News
                key="sports"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="sports"
                query={query}
              />
            </Route>

            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="entertainment"
                query={query}
              />
            </Route>
            <Route exact path="/nation">
              <News
                key="nation"
                pageSize={pages}
                countryCode={countryCode}
                languageCode={languageCode}
                category="nation"
                query={query}
              />
            </Route>
            <Route exact path="/world">
              <News
                key="world"
                pageSize={pages}
                category="world"
                languageCode={languageCode}
                query={query}
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
