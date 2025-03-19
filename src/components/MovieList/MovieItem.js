const MovieItem = ({ poster_path, title, vote_average }) => {
  const imageUrl = poster_path
    ? `https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`
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
