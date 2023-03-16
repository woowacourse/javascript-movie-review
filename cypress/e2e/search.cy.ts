const interceptFetch = (fixture: string) => {
  cy.intercept(
    {
      method: "GET",
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture },
  );
};

describe('영화 검색 기능 테스트', () => {
  it('"짱구" 검색 시 짱구 키워드 관련 검색 결과 출력', () => {
    interceptFetch('movie-search-result-page1.json');

    cy.visit('localhost:8080');

    cy.get('#search-input')
      .type('짱구 {enter}');

    cy.get('ul.item-list')
      .children('li.movie-info')
      .should('have.length', 20);
  });

  it('"짱구" 검색 후 더보기 클릭 시 결과 출력 후 더보기 버튼 제거', () => {
    interceptFetch('movie-search-result-page1.json');

    cy.visit('localhost:8080');

    cy.get('#search-input')
      .type('짱구 {enter}');

    interceptFetch('movie-search-result-page2.json');

    cy.get('section.item-view')
      .children('button')
      .click();

    cy.get('ul.item-list')
      .children('li.movie-info')
      .should('have.length', 32);

    cy.get('section.item-view')
      .should('not.contain', '더 보기');
  });
});
