import Header from './components/Header.ts';
import MovieContainer from './components/MovieContainer.ts';
import SearchBox from './components/SearchBox.ts';
import Title from './components/Title.ts';
import './resource/index.js';
import { LOGO } from './resource/index.js';

const app = document.getElementById('app');
const main = document.createElement('main');

const logo = document.createElement('img');
logo.src = LOGO;
logo.setAttribute('alt', 'MovieList 로고');

const header = Header({ title: Title({ element: logo }), searchBox: SearchBox() });

app.appendChild(header);
app.appendChild(main);
const movieContainer = new MovieContainer(main);

app.addEventListener('search', (event) => {
  movieContainer.render(event.detail);
});

app.addEventListener('home-click', () => {
  movieContainer.render();
});
