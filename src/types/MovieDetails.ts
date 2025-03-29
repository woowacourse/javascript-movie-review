interface MovieDetails {
  id: number;
  genres: { name: string }[];
  release_date: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

export default MovieDetails;
