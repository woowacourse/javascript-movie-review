import { Movie } from "../../apis/movie/api";

interface RenderThumbnailListProps {
  movies: Movie[];
}

export const renderThumbnailList = ({ movies }: RenderThumbnailListProps) => {
  const thumbnailList = document.getElementById("thumbnail-list");
  if (thumbnailList) {
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
                          <img src="./images/star_empty.png" class="star" /><span
                            >${movie.vote_average}</span
                          >
                        </p>
                        <strong>${movie.title}</strong>
                      </div>
                    </div>
                  </li>`,
    );
    thumbnailList.innerHTML = lis.join("");
  }
};
