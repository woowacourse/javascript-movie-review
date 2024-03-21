/* eslint-disable max-lines-per-function */
describe('Fixture를 이용한 영화 검색 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' },
    ).as('getSearchMovies');

    cy.visit('http://localhost:8080');
  });

  it('영화 검색 API를 호출하면 검색한 영화에 대한 결과가 목록에 나열된다', () => {
    cy.get('.search-box input[name=query]').type('해리');
    cy.get('.search-box').submit();

    cy.wait('@getSearchMovies').then((interception) => {
      // fixture data 검증 - 20개의 fixture data
      const searchMovies = interception.response?.body.results;
      expect(searchMovies.length).to.equal(20);

      // fixture data로 렌더링 검증
      cy.get('.item-list > li').should('have.length', 20);
    });
  });
});
