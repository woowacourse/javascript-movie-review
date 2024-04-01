/* eslint-disable max-lines-per-function */
describe('무한스크롤 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('화면의 가장 아래까지 스크롤 후 다음 페이지 리스트가 나온다.', () => {
    cy.wait(2000);
    cy.get('.list-end').scrollIntoView();

    cy.get('.item-card').its('length').should('be.at.most', 40);
  });
});
