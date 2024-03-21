describe('API 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    );

    cy.visit('http://localhost:8080');
  });

  it('더보기 버튼을 누르면 최대 20개씩 목록에 추가되어야 한다.', () => {
    cy.get('#see-more-button').click();
    const popularMovieItems = cy.get('.item-list > li');
    expect(popularMovieItems.should('have.length', 40));
  });
});
