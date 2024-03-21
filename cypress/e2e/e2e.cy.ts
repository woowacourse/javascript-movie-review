describe('영화 리뷰 e2e 테스트', () => {
  beforeEach('전', () => {
    cy.visit('/');
  });
  it('랜딩 페이지 접속 시 영화 목록 20개를 보여준다.', () => {
    cy.get('.item-list').find('li').should('have.length', 20);
  });

  it('더보기 클릭 시 영화 목록 20개를 추가로 보여준다.', () => {
    cy.get('#more-button').click();
    cy.get('.item-list').find('li').should('have.length', 40);
  });
});
