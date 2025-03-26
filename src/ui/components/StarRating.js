export default class StarRating {
  constructor(onSelect) {
    this.rating = 0;
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
        this.updateStars(wrapper);
        if (this.onSelect) this.onSelect(i);
      });

      wrapper.appendChild(star);
    }

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

  setRating(score) {
    this.rating = score;
  }

  getRating() {
    return this.rating;
  }
}