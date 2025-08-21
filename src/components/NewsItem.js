import React from "react";

const NewsItem = (props) => {
  let { date, title, description, imageUrl, newsUrl, author, source } = props;

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
          alt="..."
        />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-info">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}{" "}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
