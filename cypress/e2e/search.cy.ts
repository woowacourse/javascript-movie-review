describe('초기 음식점 목록 페이지를 디자인 화면과 같이 구성한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('검색결과가 없는 검색어를 입력하면, 검색 결과 없음 메시지를 띄워줘야 한다.', () => {
    cy.get('.searchbar__input').type('ㅎㅎ');
    cy.get('.searchbar__icon').click();
    cy.get('body').contains('저런! 검색 결과가 없네요 😅');
  });

  it('검색어를 입력하면, 그에 맞는 결과를 보여줘야 한다.', () => {
    cy.get('.searchbar__input').type('미키');
    cy.get('.searchbar__icon').click();
    cy.get('body').should('not.contain', '저런! 검색 결과가 없네요 😅');
  });

  it('검색어를 입력하고, 더보기 버튼을 누르면 아이템을 띄워줘야 한다.', () => {
    cy.get('.searchbar__input').type('미키');
    cy.get('.searchbar__icon').click();
    cy.get('.button--medium').click();

    cy.get('.item').should('have.length', 40);
  });
});
