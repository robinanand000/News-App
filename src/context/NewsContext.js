import { createContext, useState } from "react";

const NewsContext = createContext();

export const NewsContextProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState("in");
  const [country, setCountry] = useState("India");
  const [languageCode, setLanguageCode] = useState("en");
  const [language, setLanguage] = useState("English");
  const [query, setQuery] = useState("");

  const pageSize = 9;

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
    <NewsContext.Provider
      value={{
        pageSize,
        countryCode,
        country,
        languageCode,
        language,
        query,
        onCountryChange,
        onLanguageChange,
        onSearchHandler,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
