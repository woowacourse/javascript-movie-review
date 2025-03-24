describe('비동기 API 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.', () => {
    const popularMovieUrl = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Cypress.env('VITE_TMDB_TOKEN')}`,
      },
    };

    cy.request({
      method: 'GET',
      url: popularMovieUrl,
      ...options,
    }).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
