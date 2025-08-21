import React, { useCallback, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import "./News.css";

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const News = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = useCallback(async () => {
    setIsLoading(true);

    const url = `/.netlify/functions/newsFunction?country=${props.country}&category=${props.category}&page=${pageNo}&pageSize=${props.pageSize}`;

    const data = await fetch(url);
    const parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setIsLoading(false);
  }, [props.country, props.category, pageNo, props.pageSize]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
  }, [props.category, updateNews]);

  const handleNextClick = () => setPageNo((page) => page + 1);
  const handlePrevClick = () => setPageNo((page) => page - 1);

  return (
    <div className="container my-3">
      <div className="news-header">
        <h2>Top Headlines - {capitalizeFirstLetter(props.category)}</h2>
        <button className="btn btn-dark" onClick={updateNews}>
          Refresh
        </button>
      </div>
      {isLoading && <Spinner />}

      <div className="row">
        {!isLoading &&
          articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                date={element.publishedAt}
                title={element.title || ""}
                description={element.description || ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                source={element.source.name}
              />
            </div>
          ))}
      </div>

      {!isLoading && (
        <div className="container d-flex justify-content-evenly my-4">
          <button
            disabled={pageNo <= 1}
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={pageNo + 1 > Math.ceil(totalResults / props.pageSize)}
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
