describe('영화 상세 정보 모달 및 별점 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('localhost:8081');
    cy.viewport(1280, 960);
  });

  it('영화 아이템을 클릭하면 상세 정보 모달창이 열린다.', () => {
    cy.get('.item-box').first().click();

    cy.get('.modal').should('has.class', 'modal--open');
  });

  it('"쿵푸팬더 4"에 별점을 매기면 새로고침한 뒤에도 별점이 유지된다.', () => {
    cy.get('.search-input').type('쿵푸팬더 4');
    cy.get('.search-button').click();

    cy.get('.item-box').first().click();
    cy.wait(1000);

    cy.get('.rate-star').last().click();
    cy.wait(1000);
    cy.reload();

    cy.get('.item-box').first().click();
    cy.get('.rating-score-text').invoke('text').should('equal', '10 명작이에요');
  });
});
