import { POPULAR_MOVIES_URL } from '../../src/api';

describe('Fixture를 이용한 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept(
      {
        method: 'GET',
        url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
        headers: {
          Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
        },
      },
      { fixture: 'popular-movies.json' },
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });
});
