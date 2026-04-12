// 추상화 인터페이스
export interface ReviewStorage {
  getRating(movieId: number): Promise<number | null>;
  saveRating(movieId: number, score: number): Promise<void>; 
}

// 로컬 스토리지 구체화
class LocalReviewStorage implements ReviewStorage {
  private readonly STORAGE_KEY = 'movie_ID_stars';

  // movie_id, star 순의 영화리뷰 데이터 뽑아오기
  private getReviews(): Record<number, number> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  async getRating(movieId: number): Promise<number | null> {
    const reviews = this.getReviews();
    return reviews[movieId] || null;
  }

  // 전체 영화데이터를 긁어와서 원하는 영화의 score 덮어쓰고 다시 로컬에 저장
  async saveRating(movieId: number, score: number): Promise<void> {
    const reviews = this.getReviews();
    reviews[movieId] = score;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }
}

// 의존성 주입을 통해 교체가 용이하게 만들기 
// RevieStorage에 일단 Local 주입
// 추후 웹 API 구체화

export const reviewStorage: ReviewStorage = new LocalReviewStorage();