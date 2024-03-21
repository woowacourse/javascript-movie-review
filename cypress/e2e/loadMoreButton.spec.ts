describe('더보기 버튼 E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('더보기 버튼을 한번 누르면 20개의 목록이 추가되어야 한다', () => {
    cy.get('button[list-type="popular"]').click();

    const popularMovieItems = cy.get('.item-list > li');
    expect(popularMovieItems.should('have.length', 40));
  });

  it('검색 결과에서 더보기 버튼을 한번 누르면 20개의 목록이 추가되어야 한다', () => {
    cy.get('.search-box input').type('해리').type('{enter}');

    cy.get('button[list-type="search"]').click();

    const popularMovieItems = cy.get('.item-list > li');
    expect(popularMovieItems.should('have.length', 40));
  });
});
