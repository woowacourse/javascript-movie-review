class Movie {
  template ({ poster_path, title, vote_average }) {
    return `
    <li class="movie-info">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          loading="lazy"
          alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${vote_average}</p>
      </div>
    </li>
     `;
  }
}

export default Movie;
