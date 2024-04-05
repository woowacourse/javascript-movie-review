import Header from './components/header/Header.ts';
import MovieContainer from './components/MovieContainer.ts';
import MovieDetail from './components/MovieDetail.ts';
import './resource/index.js';

const init = () => {
  const app = document.getElementById('app');
  const main = document.createElement('main');

  new Header({
    onClick: () => {
      window.scrollTo(0, 0);
      movieContainer.render();
    },
    main: main,
  });

  const movieContainer = new MovieContainer(main);

  new MovieDetail();

  app.appendChild(main);

  movieContainer.render();
  movieContainer.setEvent();
  movieContainer.infiniteScroll();

  app.addEventListener('search', (event) => {
    movieContainer.render(event.detail);
  });
};

init();
