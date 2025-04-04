import "./MovieDescription.css";

import Rate from "../Rate/Rate";

class MovieDescription {
  #movie;

  constructor($target, movie) {
    this.$target = $target;
    this.#movie = movie;
  }

  render() {
    const { title, vote_average, genres, release_date, id, overview } =
      this.#movie;

    const $modalDescription = document.createElement("div");
    $modalDescription.classList.add("modal-description");

    const $title = document.createElement("h2");
    $title.textContent = this.title;

    const $category = document.createElement("p");
    $category.classList.add("category");
    $category.textContent = `${release_date.substr(0, 4)} · ${genres
      .map((genre) => genre.name)
      .join(", ")}`;

    const $averageContainer = document.createElement("div");
    $averageContainer.classList.add("average-container");

    const $averageInfoText = document.createElement("span");
    $averageInfoText.classList.add("average-info-text");
    $averageInfoText.textContent = "평균";

    const $rate = document.createElement("p");
    $rate.classList.add("rate");

    const $starImg = document.createElement("img");
    $starImg.src = "./images/star_filled.png";
    $starImg.classList.add("star");

    const $rateSpan = document.createElement("span");
    $rateSpan.textContent = vote_average.toFixed(1);

    $rate.appendChild($starImg);
    $rate.appendChild($rateSpan);

    $averageContainer.appendChild($averageInfoText);
    $averageContainer.appendChild($rate);

    const $hr = document.createElement("hr");

    const $infoText = document.createElement("p");
    $infoText.classList.add("info-text");
    $infoText.textContent = "내 별점";

    const $rateContainer = document.createElement("div");
    $rateContainer.classList.add("rate-container");

    $modalDescription.appendChild($title);
    $modalDescription.appendChild($category);
    $modalDescription.appendChild($averageContainer);
    $modalDescription.appendChild($hr);
    $modalDescription.appendChild($infoText);
    $modalDescription.appendChild($rateContainer);

    new Rate($modalDescription.querySelector(".rate-container"), id).render();

    const $hr2 = document.createElement("hr");
    const $overviewText = document.createElement("p");
    $overviewText.classList.add("info-text");
    $overviewText.textContent = "줄거리";

    const $detail = document.createElement("p");
    $detail.classList.add("detail");
    $detail.textContent = overview;

    $modalDescription.append($hr2, $overviewText, $detail);

    this.$target.appendChild($modalDescription);
  }
}
export default MovieDescription;
