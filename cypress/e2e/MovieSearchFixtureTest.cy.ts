import IMovieData from '../../src/interfaces/IMovieData';
import '../support/commands';

describe('Fixture를 이용한 MovieSearch 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.+1$/,
      },
      { fixture: 'movie-popular-page1.json' },
    ).as('getPopularMoviesPage1');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' },
    ).as('getSearchMovies');

    cy.visit('http://localhost:8080');
  });

  it('검색 창에 "해리 포터"를 입력 시 해리 포터 관련 영화 목록이 나타나야 한다.', () => {
    cy.viewport('macbook-16');
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('input').type('해리 포터');
      cy.get('input').type('{enter}');
    });
    cy.wait('@getSearchMovies').then((interception) => {
      const searchedMovies: IMovieData[] = interception.response?.body.results;
      searchedMovies.forEach((data) => expect(data.title).to.match(/^해리 포터/));
    });
  });

  it('마지막 페이지인 경우 더 보기 버튼이 사라져야 한다', () => {
    cy.viewport('macbook-16');
    cy.get('input').type('해리 포터');
    cy.get('input').type('{enter}');
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('.search-box > input').type('해리 포터 {enter}');
    });
    cy.wait('@getSearchMovies').then((interception) => {
      cy.scrollTo('bottom');
      cy.get('.listEnd').should('not.be.exist');
    });
  });

  it('모바일 환경에서는 검색 버튼을 눌러 input창이 나타나게 한 후 검색해야 한다.', () => {
    cy.viewport('iphone-xr');
    cy.get('button').click();
    cy.get('input').type('해리 포터');
    cy.get('input').type('{enter}');
    cy.wait('@getSearchMovies').then((interception) => {
      const searchedMovies: IMovieData[] = interception.response?.body.results;
      searchedMovies.forEach((data) => expect(data.title).to.match(/^해리 포터/));
    });
  });
});
