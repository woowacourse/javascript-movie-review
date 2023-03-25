export default class UserRating extends HTMLElement {

  private movieId = "";
  private rating: number = 0;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['movie-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const ratingBackUp = localStorage.getItem(newValue);
    this.movieId = newValue;
    this.rating = ratingBackUp ? Number(ratingBackUp) : 0;
    this.render();

  }

  setRatings(movieId: string, rating: number) {
    localStorage.setItem(movieId, rating + "");
  }


  onClickStar() {
    this.querySelectorAll<HTMLImageElement>(".rating-star").forEach(starImg => {
      starImg.addEventListener("click", () => {
        console.log(`별점 ${starImg.dataset.rating}이(가) 클릭되었습니다!`);
        this.rating = Number(starImg.dataset.rating);
        this.setRatings(this.movieId, this.rating);
        this.render();
      });
    });
  }

  render() {
    const starIcons = Array.from({ length: 5 }).map((_, i) => {
      const src = i < this.rating ? "./assets/star_filled.png" : "./assets/star_empty.png";
      return `<img class="rating-star" src="${src}" alt="별점" data-rating="${i + 1}">`;
    }).join('');

    this.innerHTML = `
    <div class="d-flex justify-content-center user-rating p-3">
      <div>내 별점</div>
      <div class="mx-2">${starIcons}</div>
      <div>${this.rating} ${this.ratingDescription(this.rating)}</div>
    </div>
    `;

    this.onClickStar();
  }

  ratingDescription(rating: number) {
    if (rating === 1) {
      return "최악이예요";
    }
    if (rating === 2) {
      return "별로예요";
    }
    if (rating === 3) {
      return "보통이에요";
    }
    if (rating === 4) {
      return "재미있어요";
    }
    if (rating === 5) {
      return "명작이에요";
    }
    return "평가하기"
  }

}
