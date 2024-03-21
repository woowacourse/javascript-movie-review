describe('영화 리뷰 웹 사이트 기능 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('더 보기 버튼을 클릭했을 때, 20개의 영화 정보가 추가됩니다.', () => {
    cy.contains('더 보기').click();

    cy.get('.item-list').children().should('have.length', 40);
  });

  it('"스파이더맨" 를 검색했을 때 영화 제목들에 "스파이더맨"이 포함됩니다.', () => {
    const search = '스파이더맨';

    cy.get('.search-box input').type(search);
    cy.get('.search-button').click();

    cy.get('.item-list')
      .children()
      .each(($element) => {
        cy.get($element).should('contain', search);
      });
  });

  it('"스파이더맨" 를 검색했을 때, 소제목이 "스파이더맨 검색결과 입니다." 로 변경됩니다.', () => {
    const search = '스파이더맨';
    const result = '"스파이더맨" 검색결과 입니다.';

    cy.get('.search-box input').type(search);
    cy.get('.search-button').click();
    cy.get('.subtitle').should('have.text', result);
  });

  it('검색 버튼을 누른 뒤 홈 버튼을 누르면 소제목이 "지금 인기있는 영화" 로 변경됩니다.', () => {
    const search = '스파이더맨';
    const result = '지금 인기 있는 영화';

    cy.get('.search-box input').type(search);
    cy.get('.search-button').click();
    cy.get('h1').click();
    cy.get('.subtitle').should('have.text', result);
  });

  it('마지막 페이지에 도달했을 시 더보기 버튼이 사라집니다.', () => {
    const search = '스파이더맨';

    cy.get('.search-box input').type(search);
    cy.get('.search-button').click();

    cy.contains('.selector', '더 보기').should('not.exist');
  });
});
