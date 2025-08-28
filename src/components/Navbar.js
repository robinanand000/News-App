import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import NewsContext from "../context/NewsContext";

const Navbar = (props) => {
  const { country, language, onCountryChange, onLanguageChange, onSearch } =
    useContext(NewsContext);
  const [searchTerm, setSearchTerm] = useState("");

  const countries = [
    { name: "India", code: "in" },
    { name: "USA", code: "us" },
    { name: "UK", code: "gb" },
    // { name: "Canada", code: "ca" },
    // { name: "Russia", code: "ru" },
    // { name: "Japan", code: "jp" },
    // { name: "China", code: "cn" },
    // { name: "Australia", code: "au" },
  ];

  const languages = [
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    // { name: "Russian", code: "ru" },
    // { name: "Japanese", code: "ja" },
    // { name: "Chinese", code: "zh" },
    // { name: "Spanish", code: "es" },
    // { name: "Italian", code: "it" },
    // { name: "Greek", code: "el" },
  ];

  const hanldeCountry = (code, name) => {
    onCountryChange(code, name);
  };
  const hanldeLanguage = (code, name) => {
    onLanguageChange(code, name);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            NewsRush
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  General
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sports">
                  Sports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/business">
                  Business
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/technology">
                  Technology
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/science">
                  Science
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/health">
                  Health
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/world">
                  World
                </NavLink>
              </li>
            </ul>

            {/* Right controls */}
            <div className="d-flex align-items-center me-3 ms-auto">
              {/* Country Dropdown */}
              <div className="d-flex align-items-center gap-3">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light btn-sm dropdown-toggle"
                    type="button"
                    id="countryDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {country}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="countryDropdown"
                  >
                    {countries.map((c) => (
                      <li key={`country-${c.code}`}>
                        <button
                          className="dropdown-item"
                          onClick={() => hanldeCountry(c.code, c.name)}
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Language Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light btn-sm dropdown-toggle"
                    type="button"
                    id="languageDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="languageDropdown"
                  >
                    {languages.map((l) => (
                      <li key={`language-${l.code}`}>
                        <button
                          className="dropdown-item"
                          onClick={() => hanldeLanguage(l.code, l.name)}
                        >
                          {l.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Search Bar */}
              <form
                className="d-flex ms-4 search-form"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ width: "240px" }}
                />
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
