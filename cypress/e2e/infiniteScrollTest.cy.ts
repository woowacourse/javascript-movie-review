describe('무한 스크롤 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('메인에서 스크롤을 내려 하단에 도착하면 총 40개의 인기 영화 목록을 볼 수 있다.', () => {
    cy.get('.movie-item').should('have.length', 20);
    cy.get('#scroll-end-box').scrollIntoView();
    cy.get('ul.item-list > li.movie-item').its('length').should('eq', 40);
  });
});
