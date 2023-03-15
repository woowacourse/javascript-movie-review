const API_KEY = '040ef8ffb4bf681809f3c88b6d22a354';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface IMovieList {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

type IGetMovies = () => Promise<IMovieList>;

export const getMovies: IGetMovies = async () => {
  try {
    const response = await fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`);

    return response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

type IGetSearchMovies = (keyword: string) => Promise<IMovieList>;
export const getSearchMovie: IGetSearchMovies = async (keyword) => {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
  );
  if (!response.ok) return [];
  return response.json();
};

//const movieList = getMovies();
//console.log(typeof movieList);
