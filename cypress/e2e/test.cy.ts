describe('E2E 테스트입니다.', () => {
  it('초기에 영화(목 데이터) 20개를 렌더링하고, 더보기를 클릭하면 다음 페이지 20개를 불러온다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      {
        fixture: 'movie-20.json',
      },
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080/');

    cy.get('#js-more-movie-button').click();
    cy.get('.item-card').should('have.length', 40);
  });

  it('검색을 하면 검색된 영화 목록을 불러오고, 더 이상 불러올 영화가 없으면 더보기 버튼이 사라진다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      {
        fixture: 'movie-20.json',
      },
    ).as('searchMovies');

    cy.visit('http://localhost:8080/');

    cy.get('#js-search-input').type('검색 키워드');
    cy.get('.search-button').click();

    cy.get('.item-card').should('have.length', 20);

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      {
        fixture: 'movie-10.json',
      },
    ).as('searchMovies');

    cy.get('#js-more-movie-button').click();
    cy.get('.item-card').should('have.length', 30);
    cy.get('#js-more-movie-button').should('not.be.visible');
  });
});
