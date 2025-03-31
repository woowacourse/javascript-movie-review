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
