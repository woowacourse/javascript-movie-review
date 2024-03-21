describe('검색 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' },
    );

    cy.visit('http://localhost:8080');
  });

  it('검색 결과가 20개 보다 작으면 더보기 버튼은 사라진다.', () => {
    cy.get('.search-button').click();
    expect(cy.get('#see-more-button').should('have.class', 'hidden'));
  });
});
