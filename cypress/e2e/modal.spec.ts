describe('Modal E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('영화 카드를 클릭하면 modal이 열린다.', () => {
    cy.get('.item-card')
      .first()
      .click()
      .then(() => {
        cy.get('.modal').should('exist');
      });
  });

  it('닫기 버튼을 클릭하면 modal이 닫힌다.', () => {
    cy.get('.item-card').first().click();
    cy.get('.modal').should('exist');
    cy.get('.modal-body__close-btn').click();
    cy.get('.modal').should('not.exist');
  });

  it('esc 키보드를 누르면 modal이 닫힌다.', () => {
    cy.get('.item-card').first().click();
    cy.get('.modal').should('exist');
    cy.get('body').type('{esc}');
    cy.get('.modal').should('not.exist');
  });
});
