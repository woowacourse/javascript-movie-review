import Header from '../components/Header';
import movieList from '../components/MovieList';

const init = () => {
  const app = document.querySelector('#app');

  if (!app) return;

  app.insertAdjacentElement('afterbegin', new Header().node);
  app.insertAdjacentElement('beforeend', movieList.node);
};

export default init;
