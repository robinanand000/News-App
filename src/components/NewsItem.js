import React, { useState } from "react";

const NewsItem = (props) => {
  let { date, title, description, imageUrl, newsUrl, source, content } = props;
  const [showContent, setShowContent] = useState(false);

  const handleGoToArticle = () => {
    window.open(newsUrl, "_blank", "noopener,noreferrer");
  };

  const handleReadMore = () => {
    setShowContent((show) => !show);
  };

  const cleanContent = (text) => {
    if (!text) return "";
    return text.replace(/\.\.\.\s*\[\d+\s*chars\]\s*$/, "...");
  };

  return (
    <div>
      <div className="card my-4">
        <img
          src={
            !imageUrl
              ? "https://images.hindustantimes.com/tech/img/2022/08/14/1600x900/iPhone-14-Pro-Purple-Front-and-Back-MacRumors-Exclusive_1653967629359_1660489027078_1660489027078.jpeg"
              : imageUrl
          }
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {showContent ? cleanContent(content) : description}
          </p>
          <p className="card-text">
            <small className="text-info">
              On {new Date(date).toGMTString()}{" "}
            </small>
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={handleReadMore}
            >
              {showContent ? "Show Less" : "Read More"}
            </button>
            <button className="btn btn-dark" onClick={handleGoToArticle}>
              Go to Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
