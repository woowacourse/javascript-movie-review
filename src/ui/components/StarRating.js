import { setRating, getRating } from "../../utils/localStorage.js";

export default class StarRating {
  constructor(movieId, onSelect) {
    this.movieId = movieId;
    this.rating = getRating(movieId);
    this.onSelect = onSelect
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "user-rating";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("img");
      star.src = "./images/star_empty.png";
      star.className = "star";
      star.dataset.value = i;

      star.addEventListener("click", () => {
        this.rating = i;
        setRating(this.movieId, this.rating);
        this.updateStars(wrapper);
        if (this.onSelect) this.onSelect(i);
      });

      wrapper.appendChild(star);
    }

    this.updateStars(wrapper);

    return wrapper;
  }

  updateStars(wrapper) {
    const stars = wrapper.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.src =
        index < this.rating
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
    });
  }

  getRating() {
    return this.rating;
  }
}