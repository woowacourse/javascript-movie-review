import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../src/constants/DTO';
import IMovieData from '../../src/interfaces/IMovieData';
import IRespondData from '../../src/interfaces/IRespondData';
import '../support/commands';

describe('Fixture를 이용한 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search.json' },
    ).as('getSearchMovies');

    cy.visit('http://localhost:8080');
  });

  it('초기 화면에는 지금 인기 있는 영화가 20개씩 목록에 나열되어야 한다', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });

  it('검색 창에 "해리 포터"를 입력 시 해리 포터 관련 영화 목록이 나타나야 한다.', () => {
    cy.wait('@getPopularMovies').then(() => {
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
    cy.wait('@getPopularMovies').then(() => {
      cy.get('input').type('해리 포터');
      cy.get('.search-button').click();
    });
    cy.wait('@getSearchMovies').then((interception) => {
      cy.scrollTo('bottom');
      cy.contains('더 보기').should('not.be.exist');
    });
  });

  it('로고 이미지 클릭 시 지금 인기 있는 영화 목록 20개를 나열해야 한다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get('input').type('해리 포터');
      cy.get('.search-button').click();
    });
    cy.wait('@getSearchMovies').then(() => {
      cy.get('h1').click();
    });
    cy.wait('@getPopularMovies').then(() => {
      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });
});
