describe('검색 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('검색 결과가 20개 보다 작으면 더보기 버튼은 사라진다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' },
    );
    cy.get('.search-button').click();
    expect(cy.get('#see-more-button').should('have.class', 'hidden'));
  });

  it('검색 결과는 제목에 포함되어 있어야 한다.', () => {
    cy.get('input[name="searchContent"]').type('해리포터');
    cy.get('.search-button').click();
    cy.get('.item-title').each(($title) => {
      const text = $title.text();
      expect(text).contain('해리 포터');
    });
  });
});
