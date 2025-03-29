// src/handlers/SearchHandler.ts
export default class SearchHandler {
  private currentQuery: string = '';

  onSearch: (query: string) => Promise<void> = async () => {};

  /**
   * 검색 요청을 처리.
   * @param query 검색어
   */
  async handleSearch(query: string): Promise<void> {
    // 검색어 저장
    this.currentQuery = query.trim();

    // 검색 이벤트 발생 - App 클래스에서 설정한 콜백 함수 호출
    await this.onSearch(this.currentQuery);
  }

  /**
   * 현재 검색어를 반환.
   */
  getCurrentQuery(): string {
    return this.currentQuery;
  }
}
