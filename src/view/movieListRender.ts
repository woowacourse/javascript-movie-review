export function movieListRender(popularMovies: Movies[]): void {
  const thumbnailList = document.querySelector(".thumbnail-list");
  const thumbnailImage = "https://media.themoviedb.org/t/p/w200";

  popularMovies?.forEach((item) => {
    const list = /*html*/ `
      <li id=${item.id}>
        <div class="item">
          <img
            class="thumbnail"
            src=${thumbnailImage + item.poster_path}
            alt=${item.title}
            onerror="this.onerror=null; this.src='../public/images/no-image.png'"
        />
          <div class="item-desc">
            <p class="rate">
              <img
                src="../../public/images/star_empty.png"
                class="star"
              /><span class="item-rate">${item.vote_average}</span>
            </p>
            <strong class="item-title">${item.title}</strong>
          </div>
        </div>
        </li>
    `;

    thumbnailList?.insertAdjacentHTML("beforeend", list);
  });
}
