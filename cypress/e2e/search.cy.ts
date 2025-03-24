describe('검색결과가 없을 경우 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('.searchbar__input').type('ㅎㅎ');
    cy.get('.searchbar__icon').click();
  });

  it('검색 결과가 없는 검색어를 입력하면, 검색 결과 없음 메시지를 띄워줘야 한다.', () => {
    cy.get('body').contains('저런! 검색 결과가 없네요 😅');
  });

  it('검색 결과가 없는 검색어를 입력하면, 작품이 렌더링 되지 않는다.', () => {
    cy.get('.item').should('have.length', 0);
  });
});

describe('검색 결과가 있는 경우 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('검색어를 입력하면, 그에 맞는 결과를 보여줘야 한다.', () => {
    cy.get('.searchbar__input').type('미키');
    cy.get('.searchbar__icon').click();

    cy.get('.item').should('have.length.at.least', 1);
    cy.get('.item').first().contains('미키');
  });

  it('검색어를 입력하고, 더보기 버튼을 누르면 아이템을 띄워줘야 한다.', () => {
    cy.get('.searchbar__input').type('미키');
    cy.get('.searchbar__icon').click();
    cy.get('.button--full').click();

    cy.get('.item').should('have.length', 40);
  });
});
