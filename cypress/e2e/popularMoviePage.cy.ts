/* eslint-disable max-lines-per-function */
describe('popularMoviePage 테스트', () => {
  it('처음 앱에 들어가면 인기순 20개의 영화를 보여준다', () => {
    cy.visit('http://localhost:8080/#');

    cy.get('.item-list li').should('have.length', 20);
  });

  it('인기순 페이지에서 더보기 버튼 클릭시, 다음 최대 20개의 영화를 보여준다.', () => {
    cy.visit('http://localhost:8080/#');

    cy.get('.item-list li').should('have.length', 20);

    cy.get('#more-button').click();

    cy.get('.item-list li').its('length').should('be.at.most', 40);
  });
});
