import "./MovieItem.css";

class MovieItem {
  constructor(movie, isLoading) {
    this.movie = movie;
    this.isLoading = isLoading;
  }

  render() {
    const $li = document.createElement("li");

    if (this.isLoading) {
      $li.classList.add("skeleton-box");
      return $li;
    }

    const { title, poster_path, vote_average } = this.movie;

    $li.innerHTML = /*html*/ `
    
        <div class="item">
            <img
            class="thumbnail"
            src=${
              poster_path === "https://image.tmdb.org/t/p/w300null"
                ? "./images/nullImage.png"
                : poster_path
            }
            alt=${title}
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" /><span
                >${vote_average}</span
                >
            </p>
            <strong>${title}</strong>
            </div>
        </div>
    
    `;

    return $li;
  }

  setEvent() {}
}
export default MovieItem;
