import { MovieItem } from './component/movie-item/MovieItem.ts';
import { SearchBar } from './component/search-bar/SearchBar.ts';

addEventListener('load', () => {
  const body = document.querySelector('body');
  const searchBar = new SearchBar();
  const testData: MovieData = {
    title: '테스트 데이터',
    score: 4.5,
    imgUrl: './search-icon.png',
  };
  const movieItem = new MovieItem({ data: testData });
  if (searchBar.element && movieItem.element) {
    body?.appendChild(searchBar.element);
    body?.appendChild(movieItem.element);
  }
});
