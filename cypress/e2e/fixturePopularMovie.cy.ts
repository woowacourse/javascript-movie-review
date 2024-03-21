/* eslint-disable max-lines-per-function */
describe('Fixture를 이용한 인기순 영화 목록 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      // fixture data 검증
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      // fixture data로 렌더링 검증
      cy.get('.item-list > li').should('have.length', 20);
    });
  });
});
