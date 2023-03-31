const URL = 'https://jeonjeunghoon.github.io/javascript-movie-review/';
const POPULAR_URL = 'https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/popular*';
const SEARCH_URL = 'https://ornate-swan-ce5a5e.netlify.app/tmdb/search/movie*';
const DETAIL_URL = 'https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/*';

describe('E2E 테스트', () => {
  beforeEach(() => {
    cy.intercept(POPULAR_URL).as('getPopularMovies');
    cy.visit(URL);
  });

  it('페이지에 접속하면 인기 있는 영화 20개가 렌더링 된다.', () => {
    cy.wait('@getPopularMovies').then(interception => {
      const movieItems = interception.response.body.results;
      cy.get('ul').children().should('have.lengthOf', 20);
      expect(movieItems.length).to.equal(20);
    });
  });

  it('맨 밑의 화면으로 내려가면, 추가로 영화 리스트를 확인할 수 있다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.intercept(POPULAR_URL).as('getPopularMovies2');
      cy.scrollTo('bottomRight');

      cy.wait('@getPopularMovies2').then(interception => {
        const movieItems = interception.response.body.results;
        cy.get('ul').children().should('have.lengthOf', 40);
        expect(movieItems.length).to.equal(20);
      });
    });
  });

  it('영화를 검색 하면(enter), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(SEARCH_URL).as('getHarryPotter');

    cy.get('.search-input').type('해리포터{enter}');
    cy.wait('@getHarryPotter').then(interception => {
      const movieList = interception.response.body.results;
      movieList.forEach(movie => expect(movie.title).to.contain('해리 포터'));
    });
  });

  it('영화를 검색 하면(클릭), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(SEARCH_URL).as('getHarryPotter');

    cy.get('.search-input').type('해리포터');
    cy.get('.search-button').click();
    cy.wait('@getHarryPotter').then(interception => {
      const movieList = interception.response.body.results;
      movieList.forEach(movie => expect(movie.title).to.contain('해리 포터'));
    });
  });

  it('영화를 클릭하면 상세 정보를 가진 모달을 보여준다.', () => {
    cy.intercept(DETAIL_URL).as('getMovieDetails');

    cy.get('li').first().click();
    cy.wait('@getMovieDetails').then(interception => {
      expect(cy.get('movie-modal').contains('내 별점'));
    });
  });
});
