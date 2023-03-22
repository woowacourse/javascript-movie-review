describe('search movie test', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' }
    ).as('searchMovie');
    cy.visit('http://localhost:8080');
  });

  it('코난 검색 시 20개의 스켈레톤이 발생한다.', () => {
    cy.get('.search-box input').type('코난');
    cy.get('.search-button').click();

    cy.wait('@searchMovie').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('코난 검색시 17개의 아이템이 로딩된다.', () => {
    cy.get('.search-box input').type('코난');
    cy.get('.search-button').click();

    cy.wait('@searchMovie').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 17);
    });
  });
});
