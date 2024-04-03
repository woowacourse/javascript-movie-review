describe('StarRating E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('세번째 별을 클릭하면, "6","보통이에요"가 출력된다.', () => {
    cy.get('.item-card')
      .first()
      .click()
      .then(() => {
        cy.get('#star-btn3').click();
        cy.get('.modal-body__star-box__rating-number').should('contain', '6');
        cy.get('.modal-body__star-box__rating-text').should(
          'contain',
          '보통이에요',
        );
      });
  });

  it('별점을 입력하고 창을 닫아도 입력한 별점이 존재한다.', () => {
    cy.get('.item-card')
      .first()
      .click()
      .then(() => {
        cy.get('#star-btn3').click();
      });
    cy.get('.modal-body__close-btn').click();
    cy.get('.item-card')
      .first()
      .click()
      .then(() => {
        cy.get('.modal-body__star-box__rating-number').should('contain', '6');
        cy.get('.modal-body__star-box__rating-text').should(
          'contain',
          '보통이에요',
        );
      });
  });
});
