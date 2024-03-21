describe('영화 리뷰 e2e 테스트', () => {
  beforeEach('전', () => {
    cy.visit('/');
  });

  describe('랜딩 페이지 테스트', () => {
    it('랜딩 페이지 접속 시 영화 목록 20개를 보여준다.', () => {
      cy.get('.item-list').find('li').should('have.length', 20);
    });

    it('더보기 클릭 시 영화 목록 20개를 추가로 보여준다.', () => {
      cy.get('#more-button').click();
      cy.get('.item-list').find('li').should('have.length', 40);
    });
  });

  describe('검색 기능 테스트', () => {
    it('마루를 입력하고 엔터 클릭 시 영화 목록 20개를 보여준다.', () => {
      cy.get('#search-input').type('마루{enter}');
      cy.get('.item-list').find('li').should('have.length', 20);
    });

    it('마루를 입력하고 버튼 클릭 시 영화 목록 20개를 보여준다.', () => {
      cy.get('#search-input').type('마루');
      cy.get('#search-button').click();
      cy.get('.item-list').find('li').should('have.length', 20);
    });
  });
});
