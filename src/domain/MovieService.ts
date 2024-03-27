import { Movie } from '../interface/Movie';

const mapDataToMovies = (movies: any): Movie[] => {
  return movies.results.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path,
      voteAverage: data.vote_average,
    };
  });
};

export default mapDataToMovies;
