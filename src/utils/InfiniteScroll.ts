import useGetMoreMovieList from "../apis/movies/useGetMoreMovieList";
import useGetMovieList from "../apis/movies/useGetMovieList";

export const observeLastMovie = () => {
  const { fetchMovies } = useGetMovieList();
  const { fetchMoreMovies } = useGetMoreMovieList();

  setTimeout(() => {
    const movieItems = document.querySelectorAll(".thumbnail-list li");
    const lastMovie = movieItems[movieItems.length - 1];

    if (!lastMovie) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreMovies(fetchMovies).then((result) => {
            if (result.length !== 0) {
              observeLastMovie();
            }
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(lastMovie);
  }, 100);
};
