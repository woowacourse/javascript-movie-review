/* eslint-disable max-lines-per-function */
describe('영화 상세 모달 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('쿵푸팬더 4 영화를 클릭하면, 쿵푸팬더 4 상세 모달이 나오고, close 버튼 클릭시 모달이 닫힌다. ', () => {
    cy.contains('쿵푸팬더 4').click();

    cy.get('dialog').should('have.attr', 'open');
    cy.get('h3').should('contain', '쿵푸팬더 4');

    cy.get('.modal-button').click();

    cy.get('dialog').should('not.have.attr', 'open');
  });
});
