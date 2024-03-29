import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';
import Throttle from './Utils/Throttle';
import MovieItemDetailModal from './components/Modal/MovieItemDetailModal';

const init = () => {
  const movieItemDetailModal = new MovieItemDetailModal();
  const itemView = new ItemView(movieItemDetailModal);
  const header = MovieHeader.create(
    () => itemView.showPopularMovies(),
    () => itemView.showSearchMovies(),
  );
  const app = document.getElementById('app');

  app.prepend(header);
  app.appendChild(itemView.getItemView());
  app.appendChild(movieItemDetailModal.getElement());

  window.addEventListener(
    'scroll',
    Throttle(() => {
      if (window.innerHeight + window.scrollY + 0.75 >= document.body.offsetHeight) itemView.mountItems();
    }, 1000),
  );
};

init();
