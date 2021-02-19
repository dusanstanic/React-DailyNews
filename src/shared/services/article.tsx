import axios from "axios";
import SearchParams from "../models/SearchParams";

async function fetch(searchParams: SearchParams) {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?apiKey=1e2928eca75447709ed601ba7d5b7641`,
    { params: searchParams }
  );

  return res.data.articles;
}

export { fetch };
