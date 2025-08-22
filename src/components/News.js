import React, { useCallback, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import "./News.css";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const News = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  }, [props.category]);

  const updateNews = useCallback(async () => {
    setIsLoading(true);

    let url = "";
    if (props.query && props.query.trim() !== "") {
      url = `https://gnews.io/api/v4/search?q=${props.query}&category=${
        props.category
      }&lang=${props.languageCode}${
        props.countryCode ? `&country=${props.countryCode}` : ""
      }&max=${props.pageSize}&page=${pageNo}&apikey=${apiKey}`;
    } else {
      url = `https://gnews.io/api/v4/top-headlines?category=${
        props.category
      }&lang=${props.languageCode}${
        props.countryCode ? `&country=${props.countryCode}` : ""
      }&max=${props.pageSize}&page=${pageNo}&apikey=${apiKey}`;
    }

    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalArticles);

    setIsLoading(false);
  }, [
    props.countryCode,
    props.category,
    pageNo,
    props.pageSize,
    props.languageCode,
    props.query,
    apiKey,
  ]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  const handleNextClick = () => {
    setPageNo((page) => page + 1);
  };

  const handlePrevClick = () => {
    setPageNo((page) => page - 1);
  };

  return (
    <div className="container my-3">
      <div className="news-header">
        {props.query ? (
          <h2>
            Total Articles Found: <strong>{articles.length}</strong>
          </h2>
        ) : (
          <h2>Top Headlines - {capitalizeFirstLetter(props.category)}</h2>
        )}
        <button className="btn btn-dark" onClick={updateNews}>
          Refresh
        </button>
      </div>
      {isLoading && <Spinner />}

      <div className="row ">
        {!isLoading &&
          articles.map((article) => {
            return (
              <div className="col-md-4" key={article.url}>
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

      {!isLoading && (
        <div className="container d-flex justify-content-evenly my-4">
          <button
            disabled={pageNo <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={pageNo + 1 > Math.ceil(totalArticles / props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
