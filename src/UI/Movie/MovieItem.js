import "./MovieItem.css";

class MovieItem {
  constructor(movie, isLoading) {
    this.movie = movie;
    this.isLoading = isLoading;
  }

  render() {
    const $li = document.createElement("li");

    if (this.isLoading) {
      const $div = document.createElement("div");
      $li.textContent = "로딩중";
      $li.style.background = "red";
      return $li;
    }

    const { title, poster_path, vote_average } = this.movie;

    $li.innerHTML = /*html*/ `
    
        <div class="item">
            <img
            class="thumbnail"
            src=${poster_path}
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
