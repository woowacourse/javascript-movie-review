interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview?: string;
  genre_ids?: string[];
}
