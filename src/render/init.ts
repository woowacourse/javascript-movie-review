import Header from '../components/Header';
import moveList from '../components/MovieList';

export default () => {
  const app = document.querySelector('#app');

  if (!app) return;

  app.insertAdjacentElement('afterbegin', new Header().node);
  app.insertAdjacentElement('beforeend', moveList.node);
};
