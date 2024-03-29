import MovieList from '../MovieList/MovieList';

const Main = () => {
  const $main = document.createElement('main');
  const movieList = MovieList();

  return {
    render: () => {
      const $movieList = movieList.render({
        title: '지금 인기있는 영화',
        type: 'popular',
        isLastPage: false,
      });

      $main.appendChild($movieList);
      return $main;
    },
  };
};

export default Main;
