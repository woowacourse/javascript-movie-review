import IMovieData from '../../src/interfaces/IMovieData';
import '../support/commands';

describe('Fixture를 이용한 MovieSearch 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept

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
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('input').type('해리 포터');
      cy.get('.search-button').click();
    });
    cy.wait('@getSearchMovies').then((interception) => {
      const searchedMovies: IMovieData[] = interception.response?.body.results;
      expect(searchedMovies.length).to.equal(10);
      searchedMovies.forEach((data) => expect(data.title).to.match(/^해리 포터/));
    });
  });

  it('마지막 페이지인 경우 더 보기 버튼이 사라져야 한다', () => {
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('input').type('해리 포터');
      cy.get('.search-button').click();
    });
    cy.wait('@getSearchMovies').then((interception) => {
      cy.scrollTo('bottom');
      cy.contains('더 보기').should('not.be.exist');
    });
  });
});
