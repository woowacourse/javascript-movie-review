import type { Movie } from "./api";

const Component = {
  movie(movieData: Pick<Movie, "poster_path" | "title" | "vote_average">) {
    const { poster_path, title, vote_average } = movieData;
    return `
    <li>
      <div class="item">
      <img
      class="thumbnail"
      src="https://image.tmdb.org/t/p/original/${poster_path}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="src/images/star_empty.png" class="star" /><span>${vote_average}</span>
            </p>
            <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
  },
};

export default Component;
