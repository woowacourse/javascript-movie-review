import { fetchDetailMovie } from "../../api/fetchDetailMovie";
import { $ } from "../../utils/dom";
import MovieDetailContent from "../movie/MovieDetail";

const loadDetailMovie = async (id: number) => {
  const movie = await fetchDetailMovie(id);
  const { title, genres, vote_average, poster_path, overview, release_date } =
    movie.data;

  const url = new URL(location.href);
  url.search = new URLSearchParams(`movieID=${id}`).toString();
  window.history.replaceState({}, "", url.toString());

  $("#modalBackground").classList.add("active");

  $(".modal").appendChild(
    MovieDetailContent({
      title,
      genres,
      vote_average,
      poster_path,
      overview,
      release_date,
    })
  );
};

export default loadDetailMovie;
