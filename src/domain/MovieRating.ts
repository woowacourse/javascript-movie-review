export default class MovieRating {
  private rating: number;
  private movieId: number;

  constructor(movieId: number, rating: number = 0) {
    this.movieId = movieId;
    this.rating = rating;
  }

  getMovieId(): number {
    return this.movieId;
  }

  getRating(): number {
    return this.rating;
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  getRatingText(): string {
    const ratingTexts: Record<number, string> = {
      1: '최악이에요',
      2: '별로예요',
      3: '보통이에요',
      4: '재미있어요',
      5: '명작이에요',
    };
    return ratingTexts[this.rating] || '이 작품 어땠나요?';
  }

  getRatingScore(): string {
    const ratingScores: Record<number, string> = {
      1: '(2/10)',
      2: '(4/10)',
      3: '(6/10)',
      4: '(8/10)',
      5: '(10/10)',
    };
    return ratingScores[this.rating] || '(?/10)';
  }
}
