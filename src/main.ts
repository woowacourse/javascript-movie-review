import Header from "./component/common/Header.js";
import MovieList from "./component/common/MovieList.js";

addEventListener("load", () => {
  Header();
  MovieList(movieData).createList();
});

const movieData=[
  {img:"",
    rating:5,
    title:"안녕"
  },
  {img:"",
    rating:6,
    title:"안녕"
  },
]
