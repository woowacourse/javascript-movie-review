describe('무한 스크롤 E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('스크롤을 하단으로 내리면 다음 item-card가 불러 와 진다.', () => {
    cy.get('.item-list').children('li').should('have.length', 20);
    cy.scrollTo('bottom', { duration: 500 });
    // 스크롤이 최 하단으로 내려가지 않아서 스크롤 이벤트 한번 더 실행
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('.item-list').children('li').should('have.length', 40);
  });
});
