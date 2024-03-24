import './resource/index';
import { LOGO } from './resource/index';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';

import MovieContainer from './components/MovieContainer.ts';
import MovieList from './components/MovieList/MovieList';

const app = document.getElementById('app');
const main = document.createElement('main');

const logo = document.createElement('img');
logo.src = LOGO;
logo.setAttribute('alt', 'MovieList 로고');

const header = Header({ title: Title({ element: logo }), searchBox: SearchBox() });
const movieList = MovieList();
main.appendChild(movieList);

app.appendChild(header);
app.appendChild(main);

const movieContainer = new MovieContainer();

app.addEventListener('search', (event) => {
  movieContainer.render(event.detail);
});

app.addEventListener('home-click', () => {
  movieContainer.render();
});
