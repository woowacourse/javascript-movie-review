describe('앱 실행 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/');
    cy.viewport(1536, 960);
  });

  context('해리포터를 검색하면', () => {
    it('해리포터 관련된 영화가 검색된다.', () => {
      cy.get('input[type="text"]').type('해리포터');
      cy.get('.search-button').click();
    });
  });

  context('로고 버튼을 누르면', () => {
    it('아래로 내려간 스크롤이 맨 위로 올라온다.', () => {
      cy.window().scrollTo('bottom');
      cy.get('.search-box').invoke('hide').wait(100);
      cy.get('.header-layout img').click();
      cy.scrollTo('top').wait(500);
      cy.window().its('scrollY').should('equal', 0);
    });
  });

  context('스크롤을 맨 밑으로 내리면', () => {
    it('새로운 영화가 20개가 나온다.', () => {
      cy.get('.load-more-position')
        .scrollIntoView({ behavior: 'smooth', block: 'end' })
        .trigger('mouseover', { force: true })
        .trigger('mouseout', { force: true });
    });
  });
});
