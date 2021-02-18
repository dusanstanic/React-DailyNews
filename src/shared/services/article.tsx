import axios from "axios";
import { count } from "console";

async function fetch() {
  const res = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=au&category=sports&apiKey=1e2928eca75447709ed601ba7d5b7641"
  );

  return res.data.articles;
}

async function fetchByCountry(country: string) {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apiKey=1e2928eca75447709ed601ba7d5b7641`
  );

  return res.data.articles;
}

export { fetch, fetchByCountry };
