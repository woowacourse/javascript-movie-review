describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl = `${Cypress.env('POPULAR_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'), // cypress.env.json
      language: 'ko-KR',
      page: 1,
    })}`;

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('검색창에 영화를 입력하면 관련 영화 목록을 보여준다.', () => {
    const movieName = '해리';

    cy.get('.search-box > input').type(movieName);
    cy.get('.search-box > button').click();

    const searchMovieUrl = `${Cypress.env('SEARCH_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'), // cypress.env.json
      language: 'ko-KR',
      query: movieName,
      page: 1,
    })}`;

    cy.request('GET', searchMovieUrl).as('searchMovies');

    cy.get('@searchMovies').its('status').should('eq', 200);
    cy.get('@searchMovies').its('body.results').should('have.length', 20);

    cy.get('@searchMovies')
      .its('body.results')
      .each((item) => {
        expect(item.title.toLowerCase()).to.include(movieName);
      });
  });

  it('검색창에 빈 값을 입력할 경우, "검색된 영화가 없습니다"를 보여준다.', () => {
    cy.get('.search-box > button').click();

    cy.get('.search-error-msg').should('have.text', '검색된 영화가 없습니다 💢');
  });
});
