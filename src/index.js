import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';
import Throttle from './Utils/Throttle.ts';

const init = () => {
  const itemView = new ItemView();
  const header = MovieHeader.create(
    () => itemView.showPopularMovies(),
    () => itemView.showSearchMovies(),
  );

  const app = document.getElementById('app');
  app.prepend(header);
  app.appendChild(itemView.getItemView());

  const isTouchedBottom = () => window.innerHeight + window.scrollY + 10 >= document.body.offsetHeight;
  window.addEventListener(
    'scroll',
    Throttle(() => {
      if (isTouchedBottom) itemView.mountItems();
    }, 1000),
  );
};

init();
