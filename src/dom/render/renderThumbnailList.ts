import { Movie } from "../../apis/movie/api";

interface RenderThumbnailListProps {
  movies: Movie[];
  thumbnailListElement: HTMLElement | null;
}

export const renderThumbnailList = ({
  movies,
  thumbnailListElement,
}: RenderThumbnailListProps) => {
  if (thumbnailListElement) {
    const lis = movies.map(
      (movie) => `<li id="movie-${movie.id}">
                    <div class="item">
                      <img
                        class="thumbnail"
                        src="${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}"
                        alt="${movie.title} 포스터"
                      />
                      <div class="item-desc">
                        <p class="rate">
                          <img src="./public/images/star_empty.png" class="star" /><span
                            >${movie.vote_average}</span
                          >
                        </p>
                        <strong>${movie.title}</strong>
                      </div>
                    </div>
                  </li>`,
    );
    thumbnailListElement.insertAdjacentHTML("beforeend", lis.join(""));
  }
};
