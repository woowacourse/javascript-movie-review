import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';

const init = () => {
  const itemView = new ItemView();
  const header = MovieHeader.create(
    () => itemView.showPopularMovies(),
    () => itemView.showSearchMovies(),
  );

  const app = document.getElementById('app');
  app.prepend(header);
  app.appendChild(itemView.getItemView());
};

init();
