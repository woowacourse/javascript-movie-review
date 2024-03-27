import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';
import Throttle from './Utils/Throttle.js';

const init = () => {
  const itemView = new ItemView();
  const header = MovieHeader.create(
    () => itemView.showPopularMovies(),
    () => itemView.showSearchMovies(),
  );

  const app = document.getElementById('app');
  app.prepend(header);
  app.appendChild(itemView.getItemView());

  window.addEventListener(
    'scroll',
    Throttle(() => {
      if (window.innerHeight + window.scrollY + 10 >= document.body.offsetHeight) {
        itemView.mountItems();
      }
    }, 1000),
  );
};

init();
