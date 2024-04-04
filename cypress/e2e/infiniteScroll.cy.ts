describe('무한스크롤 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('localhost:8081');
    cy.viewport(1280, 960);
  });

  it('화면 하단까지 스크롤하면 다음 페이지가 렌더링된다.', () => {
    cy.wait(1500);
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('.item-list li').should('have.length', 40);

    cy.wait(1500);
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('.item-list li').should('have.length', 60);

    cy.wait(1500);
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('.item-list li').should('have.length', 80);
  });
});
