import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import MovieItem from "./components/movie/MovieItem.ts";
import { $ } from "./utils/dom.ts";


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
    app.appendChild(footer);
    app.appendChild(movieItem);
  }
});
