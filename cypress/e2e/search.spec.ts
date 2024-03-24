describe('검색 기능 E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('검색어를 입력한 후, Enter를 누르면 영화를 검색한다', () => {
    cy.get('.search-box input').type('해리 포터').type('{enter}');

    cy.get('.item-view h2').should('contain', '해리 포터');
  });

  it('검색어를 입력한 후, "검색" 버튼을 누르면 영화를 검색한다', () => {
    cy.get('.search-box input').type('해리 포터');
    cy.get('.search-box button').click();

    cy.get('.item-view h2').should('contain', '해리 포터');
  });

  it('검색어를 입력한 후, 공백으로 돌아오면 인기 영화 목록을 불러온다', () => {
    const query = '해리 포터';
    cy.get('.search-box input').type(query);
    cy.get('.search-box button').click();
    Array.from({ length: query.length }).forEach(() => {
      cy.get('.search-box input').type('{backspace}');
    });

    cy.get('.item-view h2').should('contain', '지금 인기있는 영화');
  });

  it('검색어를 입력한 후, 검색 결과가 없을 때 "검색 결과가 존재하지 않습니다" 문구를 출력한다', () => {
    cy.get('.search-box input').type('dddd');
    cy.get('.search-box button').click();

    cy.get('.search-results-not-found').should('exist');
  });
});
