class RatingRepository {
  getRate(movieId: number): number | null {
    const value = localStorage.getItem(`movie-${movieId}`);
    return value ? Number(value) : null;
  }
  setRate(movieId: number, rate: number) {
    localStorage.setItem(`movie-${movieId}`, rate.toString());
  }
}

export default RatingRepository;
