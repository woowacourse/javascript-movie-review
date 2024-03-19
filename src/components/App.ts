import Header from './Header/Header';
import MovieList from './MovieList/MovieList';

function App() {
  return {
    render: () => {
      const $app = document.querySelector('#app');
      $app?.appendChild(Header().render());
      $app?.appendChild(MovieList().render());
    },
  };
}

export default App;
