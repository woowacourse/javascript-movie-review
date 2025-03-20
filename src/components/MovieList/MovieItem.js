const MovieItem = ({ poster_path, title, vote_average }) => {
  const imageUrl = poster_path
    ? `${import.meta.env.VITE_TMDB_API_POSTER_URL}${poster_path}`
    : "./images/logo.png";

  return /* html */ `
    <li>
      <div class="item">
        <img class="thumbnail" src="${imageUrl}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span>${vote_average}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
};

export default MovieItem;
