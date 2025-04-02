import { Genre } from "../types/Type";

export const getYear = (releaseDate: string) => {
  const data = new Date(releaseDate);
  return data.getFullYear();
};

export const getGenres = (genres: Genre[]) => {
  return genres.map(({ name }) => name).join(", ");
};
