class Movie {
  template ({ posterPath, title, voteAverage, backdropPath }) {
    return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${posterPath}"
            loading="lazy"
            alt="${title}"
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    </li>
     `;
  }
}

export default Movie;
