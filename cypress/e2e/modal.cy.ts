describe('모달 테스트.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('item을 클릭하면 모달창이 뜨고, 별점을 부여할 수 있다.', () => {
    cy.get('.item').eq(0).click();
    cy.get('.modal-star').eq(4).click();
    cy.get('.modal').should('contain', '명작이에요');
    cy.get('.modal').should('contain', '10/10');
  });
});
