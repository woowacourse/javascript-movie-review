describe('페이지 접속 초기 화면의 인기있는 영화 목록에 대한 테스트입니다.', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular\?.*/,
      },
      {
        fixture: 'movie-20.json',
      },
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080/');
  });

  it('페이지에 접속하면 인기있는 영화(목 데이터) 20개를 렌더링한다.', () => {
    cy.get('.item-card').should('have.length', 20);
  });

  it('더보기를 클릭하면 다음 페이지의 영화 20개를 불러온다.', () => {
    cy.get('#js-more-movie-button').click();
    cy.get('.item-card').should('have.length', 40);
  });

  it('더 이상 불러올 영화가 없으면 더보기 버튼이 사라진다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular\?.*/,
      },
      {
        fixture: 'movie-10.json',
      },
    ).as('getPopularMovies');

    cy.get('#js-more-movie-button').click();
    cy.get('.item-card').should('have.length', 30);
    cy.get('#js-more-movie-button').should('not.be.visible');
  });
});
