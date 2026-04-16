import { USER_RATE } from "../constants/rate";
import { formatMovieMeta } from "../utils/formatMovieMeta";
import emptyIcon from "../asset/images/empty_icon.png";
import filledStar from "../asset/images/star_filled.png";
import emptyStar from "../asset/images/star_empty.png";

export class ModalView {
  #modalSection;
  #closeButton;
  #detailSection;
  #handle;

  constructor(handle: (id: string) => void) {
    this.#modalSection = document.querySelector("#modalBackground");
    this.#closeButton = document.querySelector("#closeModal");
    this.#detailSection = document.querySelector("#modalContainer");
    this.#handle = handle;
    this.#modalBinding();
  }

  #modalBinding() {
    this.#closeButton?.addEventListener("click", () => this.close());
    this.#modalSection?.addEventListener("click", (event) =>
      this.#backgroundClose(event),
    );
    window.addEventListener("keydown", (event) => this.#escFunction(event));
  }

  #escFunction(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  #backgroundClose(event: Event) {
    if (event.target === this.#modalSection) {
      this.close();
    }
  }

  render(item: MovieItem, rateCount: number) {
    if (!this.#detailSection) return;

    this.#detailSection.innerHTML = `
         <div class="modal-image">
            <img
              src=""
            />
          </div>
          <div class="modal-description">
            <div class="modal-title-section">
              <h2 class="modal-title"></h2>
              <p class="category"></p>
              <div class="rate-section">
                <p>평균</p>
                <div class="rate">
                  <img src="" class="star" />
                  <p></p>
                </div>
              </div>
            </div>
            <div class="modal-myrate-section">
              <h3 class="myrate-title">내 별점</h3>
              <div class="myrate-section">
                <div class="myrate-stars"></div>
                <div class="myrate-comment"> 
                  <span class="myrate-text"></span> 
                  <span class="myrate-score"></span>
                </div>
              </div>
            </div>
            <div class="modal-detail-section">
              <h3 class="detail-title">줄거리</h3>
              <p class="detail"></p>
            </div>
          </div>
    `;

    this.#setModalImage(item.poster_path);
    this.#setModalDetail(item);
    this.renderRate(rateCount);
    this.#starsBinding();
  }

  #setModalImage(path: string) {
    if (!this.#detailSection) return;

    const posterImage =
      this.#detailSection?.querySelector<HTMLImageElement>(".modal-image img");
    if (!posterImage) return;

    const poster_path = "https://image.tmdb.org/t/p/original/" + path;

    posterImage.src = poster_path;
  }

  #setModalDetail(item: MovieItem) {
    if (!this.#detailSection) return;

    // title
    const titleSection =
      this.#detailSection.querySelector<HTMLElement>(".modal-title");
    if (!titleSection) return;

    titleSection.textContent = item.title;

    // category
    const categorySection =
      this.#detailSection.querySelector<HTMLElement>(".category");
    if (!categorySection) return;

    categorySection.textContent = formatMovieMeta(
      item.release_date,
      item.genres,
    );

    // rate
    const rateStart =
      this.#detailSection.querySelector<HTMLImageElement>(".rate img");
    if (!rateStart) return;

    rateStart.src = filledStar;

    const rateSection =
      this.#detailSection.querySelector<HTMLElement>(".rate p");
    if (!rateSection) return;

    rateSection.textContent = item.vote_average.toFixed(1);

    // detail
    const detailSection =
      this.#detailSection.querySelector<HTMLElement>(".detail");
    if (!detailSection) return;

    detailSection.textContent = item.overview;
  }

  renderRate(rateCount: number) {
    if (!this.#detailSection) return;

    const myStars = this.#detailSection?.querySelector(".myrate-stars");
    if (!myStars) return;

    myStars.replaceChildren(...this.#renderStars(rateCount));

    const textSection =
      this.#detailSection.querySelector<HTMLElement>(".myrate-text");
    if (!textSection) return;

    textSection.textContent = USER_RATE[rateCount];

    const scoreSection =
      this.#detailSection.querySelector<HTMLElement>(".myrate-score");
    if (!scoreSection) return;

    scoreSection.textContent = `(${rateCount * 2}/10)`;
  }

  #renderStars(rate: number) {
    return Array.from({ length: 5 }, (_, index) => {
      const starImage = document.createElement("img");

      starImage.src = rate <= index ? emptyStar : filledStar;
      starImage.alt = "star";
      starImage.id = String(index + 1);

      return starImage;
    });
  }

  #starsBinding() {
    const starSection = this.#detailSection?.querySelector(".myrate-stars");

    starSection?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const item = target.closest("img");
      if (!item?.id) return;

      this.#handle(item.id);
    });
  }

  spinnerRender() {
    if (!this.#detailSection) return;

    this.#detailSection.innerHTML = `
      <div class="modal-loading">
        <div class="spinner"></div>
      </div>
    `;
  }

  errorRender(message: string) {
    const emptyList = /*html*/ `
          <div class="modal-error">
            <img src="${emptyIcon}" alt="empty_icon" />
            <p>${message}</p>
          </div>
    `;

    if (!this.#detailSection) return;
    this.#detailSection.innerHTML = emptyList;
  }

  showToast(message: string) {
    const toastMessege = document.querySelector(".toast-error-text");
    if (!toastMessege) return;
    toastMessege.textContent = message;

    const toastSection = document.querySelector<HTMLElement>(".toast-error");
    if (!toastSection) return;
    toastSection.classList.add("active");

    window.setTimeout(() => {
      this.#hideToast();
    }, 1500);
  }

  #hideToast() {
    const toastSection = document.querySelector<HTMLElement>(".toast-error");
    if (!toastSection) return;
    toastSection.classList.remove("active");
  }

  open() {
    if (!this.#modalSection) return;

    document.body.style.overflow = "hidden";
    this.#modalSection.classList.add("active");
  }

  close() {
    if (!this.#modalSection) return;

    document.body.style.overflow = "auto";
    this.#modalSection.classList.remove("active");
  }
}
