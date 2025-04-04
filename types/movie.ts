export type Movie = {
  id: number;
  title: string;
  rating: number;
  imageSrc: string | null;
  description: string;
  releaseDate: string;
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = Movie & {
  voteCount: number;
};

export type MovieRating = {
  movieId: number;
  rating: number;
};
