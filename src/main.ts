import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import MovieItem from "./components/movie/MovieItem.ts";
import { $ } from "./utils/dom.ts";

async function fetchPopularMovieList() {
  const url = "https://api.themoviedb.org/3/movie/popular";
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: 'application/json'
    }
  }

  const response = await fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
	
	return response;
}

console.log(fetchPopularMovieList());

addEventListener("load", () => {
  const app = $("#app");
  
  const header = Header({title:"인사이드 아웃2"});
  if (!header) return;
  const footer = Footer();
  const movieItem = MovieItem({
    src:"https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg",
    title:"인사이드 아웃2",
    rate:7.7
  })

  if (app) {
    app.appendChild(header);
    app.appendChild(movieItem);
    app.appendChild(footer);
  }
});
