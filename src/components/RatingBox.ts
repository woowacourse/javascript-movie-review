import { COMMENT } from '../constant/movie';

export default class RatingBox extends HTMLElement {
  #state: RatingBoxState = { myRating: 0 };

  get myRating() {
    return Number(this.getAttribute('my-rating'));
  }

  get movieId() {
    return Number(this.getAttribute('movie-id'));
  }

  connectedCallback() {
    this.setState({ myRating: this.myRating });
    this.render();
    this.setEvent();
  }

  render() {
    const { myRating } = this.#state;

    this.innerHTML = `
      <div class="rating-box flex align-center">
        <p>내 별점</p>
        <img class="star star-${
          myRating >= 2 ? 'filled' : 'empty'
        } mr-4" alt="별점" />
        <img class="star star-${
          myRating >= 4 ? 'filled' : 'empty'
        } mr-4" alt="별점" />
        <img class="star star-${
          myRating >= 6 ? 'filled' : 'empty'
        } mr-4" alt="별점" />
        <img class="star star-${
          myRating >= 8 ? 'filled' : 'empty'
        } mr-4" alt="별점" />
        <img class="star star-${
          myRating >= 10 ? 'filled' : 'empty'
        } mr-4" alt="별점" />
        <h4 class="rating-count">${myRating}</h4>
        <h4 class="comment">${COMMENT[myRating]}</h4>
      </div>
        `;
  }

  setEvent() {
    const $stars = this.querySelectorAll('.star');
    $stars?.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.setState({
          myRating: (index + 1) * 2,
        });
        this.render();
        this.setEvent();
        this.dispatchEvent(
          new CustomEvent('set-my-rating', {
            bubbles: true,
            detail: { movieId: this.movieId, myRating: this.#state.myRating },
          }),
        );
      });
    });
  }

  setState(newState: object) {
    this.#state = { ...this.#state, ...newState };
  }
}

customElements.define('rating-box', RatingBox);
