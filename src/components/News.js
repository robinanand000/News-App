import React, { useCallback, useContext, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import "./News.css";
import NewsContext from "../context/NewsContext";

const News = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const { pageSize, countryCode, languageCode, query } =
    useContext(NewsContext);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const resetNews = () => {
    setPage(1);
    updateNews();
  };
  const updateNews = useCallback(async () => {
    // if (isLoading) return;
    setIsLoading(true);

    let url;

    if (query && query.trim() !== "") {
      url = `https://gnews.io/api/v4/search?q=${query}&category=${
        props.category
      }&lang=${languageCode}&country=${
        countryCode ? countryCode : ``
      }&max=${pageSize}&page=${page}&apikey=${apiKey}`;
    } else {
      url = `https://gnews.io/api/v4/top-headlines?category=${
        props.category
      }&country=${
        countryCode ? countryCode : ``
      }&lang=${languageCode}&max=${pageSize}&page=${page}&apikey=${apiKey}`;
    }

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    if (Array.isArray(parsedData.articles)) {
      setArticles(parsedData.articles);
      if (query && query.trim() !== "") {
        setTotalArticles(parsedData.articles.length);
        console.log(parsedData.articles);
      } else {
        setTotalArticles(parsedData.totalArticles);
      }
    } else {
      setArticles([]);
      console.warn("API error:", parsedData);
      setTotalArticles(0);
    }
    setIsLoading(false);
  }, [
    countryCode,
    props.category,
    languageCode,
    query,
    pageSize,
    page,
    apiKey,
  ]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  return (
    <div className="container my-3">
      <div className="news-header">
        {props.query ? (
          <h2>
            Total Articles Found: <strong>{articles.length}</strong>
          </h2>
        ) : (
          <h2>Top Headlines - {props.category} </h2>
        )}
        <button className="btn btn-dark" onClick={resetNews}>
          Refresh
        </button>
      </div>

      <div className="position-relative">
        {isLoading && (
          <div className="spinner-overlay">
            <Spinner />
          </div>
        )}
        <div className="row ">
          {!isLoading &&
            articles.map((article) => {
              return (
                <div className="col-md-4" key={article.id}>
                  <NewsItem
                    date={article.publishedAt}
                    title={article.title ? article.title : ""}
                    description={article.description ? article.description : ""}
                    imageUrl={article.image}
                    newsUrl={article.url}
                    source={article.source.name}
                    content={article.content}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow mt-4">
        {/* Prev button */}
        <button
          className="btn btn-dark"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ⬅ Previous
        </button>

        {/* Page number */}
        <span className="fw-semibold text-dark">Page {page}</span>

        {/* Next button */}
        <button
          className="btn btn-dark"
          disabled={page >= Math.ceil(totalArticles / props.pageSize)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default News;
