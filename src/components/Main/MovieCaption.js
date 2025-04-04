function MovieCaption({ title, vote_average }) {
  const $movieCaption = document.createElement("div");

  $movieCaption.classList.add("item-desc");
  $movieCaption.innerHTML = ` 
  <p class="rate">
    <img src="./star_empty.png" class="star" />
    <span>${vote_average.toFixed(1)}</span>
  </p>
  <div class="movie-title">${title}</div>
`;

  return $movieCaption;
}

export default MovieCaption;
