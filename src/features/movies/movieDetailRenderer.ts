import { MovieDetailInfo } from "../../../types/movieApiType";
import Modal from "../../components/Modal";
import { fetchMovieDetail } from "./movieService";

export const movieDetailRenderer = async () => {
  const {
    backdrop_path,
    genres,
    id,
    overview,
    release_date,
    title,
    vote_average,
  }: MovieDetailInfo = await fetchMovieDetail();

  Modal({
    backdrop_path,
    title,
    release_year: Number(release_date.split("-")[0]),
    genres: genres.map((genre) => genre.name),
    vote_average,
    overview,
  });
};
