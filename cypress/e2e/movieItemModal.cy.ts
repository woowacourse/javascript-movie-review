describe('영화 상세 정보 모달 시나리오 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('영화 아이템을 클릭하면 상세 정보 모달창이 뜨고, 별점을 부여한 후 창을 닫을 수 있다.', () => {
    cy.get('.item').eq(0).click();
    cy.get('.modal-star').eq(4).click();
    cy.get('.modal').should('contain', '명작이에요');
    cy.get('.modal').should('contain', '10/10');
    cy.get('.close-modal').click();
    cy.get('.active').should('not.exist');
  });
});
