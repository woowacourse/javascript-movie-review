import MovieList from '../MovieList/MovieList';

const Main = () => {
  const $main = document.createElement('main');
  const $movieList = MovieList().render({
    title: '지금 인기있는 영화',
    isLastPage: false,
  });

  return {
    render: () => {
      $main.appendChild($movieList);

      return $main;
    },
  };
};

export default Main;
