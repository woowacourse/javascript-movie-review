import "../templates/reset.css";
import "../templates/common.css";
import MovieClient from "./http/MoveClient";
import { BASE_URL } from "./constants/movies";
import { createElement } from "./utils/dom";
// import App from "./App";
import Header from "./components/Header";

// const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("error:" + err));

// new App(document.querySelector("#app"));

const rootElement = document.querySelector("#app");
const headerElement = createElement<HTMLDivElement>("header");

rootElement?.appendChild(headerElement);

new Header(headerElement, {
  onLogoClick: () => {
    console.log("hello");
  },
  onSearchKeywordSubmit: () => {
    console.log("hello");
  },
});
