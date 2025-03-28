import ErrorModal from "../components/ErrorModal";
import { addMoreMovies } from "../movies/addMoreMovies";
import { withSkeleton } from "../skeletons/withSkeleton";

export const intersectionObserver = (movieList: HTMLElement) => {
  const target = document.getElementById("target") as HTMLElement;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        try {
          withSkeleton(movieList, addMoreMovies(movieList));
        } catch (error) {
          ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
        }
      }
    });
  });

  observer.observe(target);
};
