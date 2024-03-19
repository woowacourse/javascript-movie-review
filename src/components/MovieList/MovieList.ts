import fetchData from '../../utils/fetchData';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.css';

const MovieList = () => {
  const fetchPopularMovies = async () => {
    const apiKey: string = process.env.API_KEY as string;
    const url = `${process.env.BASE_URL}popular?${new URLSearchParams({
      api_key: apiKey,
      language: 'ko-KR',
      page: '1',
    })}`;
    const data = await fetchData(url);
    const movies = [...data.results].map(
      ({ id, original_title, vote_average, poster_path }) => ({
        id,
        original_title,
        vote_average,
        poster_path,
      }),
    );
    return movies;
  };

  const state: { movies: Movie[] } = {
    movies: [],
  };

  fetchPopularMovies().then((movies) => {
    const $ul = document.querySelector('.item-view ul') as HTMLElement;
    movies.forEach((movie) => {
      const $movieItem = MovieItem(movie).render();
      $ul.appendChild($movieItem);
    });
  });

  return {
    render: () => {
      const $main = document.createElement('main');

      const $section = document.createElement('section');
      $section.classList.add('item-view');

      const $title = document.createElement('h2');
      $title.textContent = '지금 인기 있는 영화';

      const $ul = document.createElement('ul');
      $ul.classList.add('item-list');
      $main.appendChild($section);
      $section.appendChild($title);
      $section.appendChild($ul);
      // if(state.).movies.map((movie) => MovieItem(movie));
      state.movies.map((movie) => MovieItem(movie));
      return $main;
    },
  };
};

export default MovieList;
