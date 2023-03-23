import { GenreType, MovieDetails } from "../abstracts/type";

export const fetchMovieDetails = async (movieId: string) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=6df0efa1372141fac2793e6184ea5add&language=ko-KR`,
    { method: "GET" }
  )
    .then(async (res) => {
      const movieDetails = await res.json();

      movieDetails.genres = movieDetails.genres
        .map((genre: GenreType) => genre.name)
        .join(", ");

      return movieDetails;
    })
    .catch(() => {
      console.log("영화 데이터 로드 오류");
    });

  const { id, genres, overview, poster_path, title, vote_average } = data;
  const detailData: MovieDetails = {
    id,
    genres,
    overview,
    poster_path,
    title,
    vote_average,
  };

  return detailData;
};
