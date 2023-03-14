import Header from "./components/Header";
import { $ } from "./utils/Dom";
import Star from "./assets/star_filled.png";

export default class App {
  #movieList = [];
  #page = 1;

  constructor() {
    this.init();
    new Header();
    this.setEvent();
  }

  init() {
    const ajax = new XMLHttpRequest();
    ajax.open(
      "GET",
      `https://api.themoviedb.org/3/movie/popular?api_key=8234a3d5f8d4ad207c32e60e4aa9486b&language=ko-KR&page=${
        this.#page
      }`,
      true
    );
    ajax.send(null);
    ajax.onload = () => {
      if (ajax.status === 200) {
        const data = JSON.parse(ajax.response);
        const results = data.results;
        results.forEach((item) => {
          this.#movieList.push({
            title: item.title,
            poster: item.poster_path,
            rating: item.vote_average,
          });
        });
        this.#page += 1;
        const ItemList = $(".item-list");
        ItemList.innerHTML = "";

        this.render();
      }
    };
  }

  render() {
    const ItemList = $(".item-list");

    this.#movieList.forEach((item) => {
      ItemList.insertAdjacentHTML(
        "beforeend",
        `
        <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="https://image.tmdb.org/t/p/w220_and_h330_face${item.poster}"
              loading="lazy"
              alt="${item.title}"
            />
            <p class="item-title">${item.title}</p>
            <p class="item-score">${item.rating}<img src=${Star} alt="별점" /> </p>
            
          </div>
        </a>
      </li>
      `
      );
    });
  }

  setEvent() {
    const moreButton = $("#more-button");
    moreButton.addEventListener("click", () => {
      console.log(this.#page);
      const ajax = new XMLHttpRequest();
      ajax.open(
        "GET",
        `https://api.themoviedb.org/3/movie/popular?api_key=8234a3d5f8d4ad207c32e60e4aa9486b&language=ko-KR&page=${
          this.#page
        }`,
        true
      );
      ajax.send(null);
      ajax.onload = () => {
        if (ajax.status === 200) {
          const data = JSON.parse(ajax.response);
          const results = data.results;
          this.#movieList = [];
          results.forEach((item) => {
            this.#movieList.push({
              title: item.title,
              poster: item.poster_path,
              rating: item.vote_average,
            });
          });
          this.#page++;
          this.render();
        }
      };
    });
  }
}
