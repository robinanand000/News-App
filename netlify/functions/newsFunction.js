import fetch from "node-fetch";

export async function handler(event, context) {
  const {
    category = "general",
    country = "us",
    page = 1,
    pageSize = 12,
  } = event.queryStringParameters || {};

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
