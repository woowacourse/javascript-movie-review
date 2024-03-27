import { Movie } from '../interface/Movie';

const mapDataToMovies = (movies: any): Movie[] => {
  return movies.results.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
    };
  });
};

export default mapDataToMovies;
