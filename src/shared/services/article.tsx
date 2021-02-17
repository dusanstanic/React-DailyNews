import axios from "axios";

async function fetchNews() {
  const res = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=fr&category=sports&apiKey=1e2928eca75447709ed601ba7d5b7641"
  );

  return res.data.articles;
}

export { fetchNews };
