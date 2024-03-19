import "../templates/reset.css";
import "../templates/common.css";
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

const headerElement = document.createElement("header");
const headerComponent = new Header(headerElement, {
  onLogoClick: () => {
    console.log("hello");
  },
  onSearchKeywordSubmit: () => {
    console.log("hello");
  },
});

rootElement?.appendChild(headerElement);

/* 
api 호출할 때, 몇번 째 페이지를 요청하고 있는지를 가지고 있어야 되지 않나??
*/
// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => (movieList = json))
//   .catch((err) => console.error("error:" + err));

import MovieClient from "./http/MoveClient";
import { BASE_URL } from "./constants/movies";
