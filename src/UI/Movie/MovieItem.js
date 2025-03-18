import "./MovieItem.css";

class MovieItem {
  render() {
    const $li = document.createElement("li");

    $li.innerHTML = /*html*/ `
    
        <div class="item">
            <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
            alt="인사이드 아웃 2"
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" /><span
                >7.7</span
                >
            </p>
            <strong>인사이드 아웃 2</strong>
            </div>
        </div>
    
    `;

    return $li;
  }

  setEvent() {}
}
export default MovieItem;
