describe('영화 목록 API 호출 성공 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('메인 페이지 진입 시 20개의 인기 영화 목록을 볼 수 있다.', () => {
    const popularMovieUrl = `${Cypress.env('POPULAR_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: 1,
    })}`;

    cy.intercept({
      method: 'get',
      url: popularMovieUrl,
    }).as('fetchPopularMovies');

    cy.get('ul.item-list > li').its('length').should('eq', 20);
  });

  it('올바른 검색어 입력 시 20개의 검색 영화 목록을 볼 수 있다.', () => {
    const input = '해리포터';
    const searchMovieUrl = `${Cypress.env('SEARCH_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: 1,
      query: input,
    })}`;

    cy.intercept({
      method: 'get',
      url: searchMovieUrl,
    }).as('fetchSearchedMovies');

    cy.get('ul.item-list > li').its('length').should('eq', 20);
  });
});
