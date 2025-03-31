function MovieCaption({ title, vote_average }) {
  const $movieCaption = document.createElement("div");

  $movieCaption.classList.add("item-desc");
  $movieCaption.innerHTML = ` 
  <p class="rate">
    <img src="images/star_empty.png" class="star" />
    <span>${vote_average.toFixed(1)}</span>
  </p>
  <strong>${title}</strong>
`;

  return $movieCaption;
}

export default MovieCaption;
