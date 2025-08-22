import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [country, setCountry] = useState("Country");
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("Lang");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const countries = [
    { name: "World", code: "" },
    { name: "USA", code: "us" },
    { name: "India", code: "in" },
    { name: "UK", code: "gb" },
    { name: "Australia", code: "au" },
  ];

  const languages = [
    { name: "English", code: "en" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            NewsApp
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  General
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
                <NavLink className="nav-link" to="/sports">
                  Sports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nation">
                  Nation
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
              <div className="d-flex align-items-center gap-2">
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
                      <li key={c.code}>
                        <button
                          className="dropdown-item"
                          onClick={() => setCountry(c.name)}
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
                      <li key={l.code}>
                        <button
                          className="dropdown-item"
                          onClick={() => setLanguage(l.name)}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
