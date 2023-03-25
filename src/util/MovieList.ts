import { MovieElementData, MovieItem } from "../abstracts/type";

const transformMovieItemsType = (
  movieItems: MovieItem[]
): MovieElementData[] => {
  return movieItems.map(
    ({ poster_path, id, title, vote_average }: MovieItem) => ({
      poster_path,
      id,
      title,
      vote_average,
    })
  );
};

export default transformMovieItemsType;
