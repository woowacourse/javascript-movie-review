class Rating {
  #userRating: number;

  constructor(userRating: number = 0) {
    this.#userRating = userRating;
  }

  get userRating() {
    return this.#userRating;
  }

  get score() {
    return this.#userRating * 2;
  }

  get comment() {
    const COMMENT: Record<number, string> = {
      0: '영화 어떻게 보셨나요?',
      2: '최악이에요',
      4: '별로에요',
      6: '보통이에요',
      8: '재미있어요',
      10: '명작이에요',
    };
    return COMMENT[this.score] || '';
  }

  update(newRating: number) {
    this.#userRating = newRating;
  }
}

export default Rating;
