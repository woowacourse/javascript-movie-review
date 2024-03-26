import Header from './components/Header.ts';
import MovieContainer from './components/MovieContainer.ts';
import './resource/index.js';

const init = () => {
  const app = document.getElementById('app');
  const main = document.createElement('main');

  new Header({ onClick: () => movieContainer.render(), main: main });
  const movieContainer = new MovieContainer(main);

  app.appendChild(main);

  movieContainer.render();
  movieContainer.setEvent();

  app.addEventListener('search', (event) => {
    movieContainer.render(event.detail);
  });
};

init();
