import { CLASS, ID } from '../../src/constants/selector';
import type { MovieAPIResponse } from '../../src/types/movie';

beforeEach(() => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture: 'movie-popular-mock.json' }
  ).as('getPopularMovies');

  cy.visit('http://localhost:8080/');
});

describe('메인 화면 테스트', () => {
  it('앱을 실행하면 지금 인기있는 영화 리스트 20개를 보여준다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.get(`.${CLASS.ITEM_VIEW} > h2`).should('have.text', '지금 인기있는 영화');
    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 20);
  });
});

describe('영화 검색 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search-mock.json' }
    ).as('getSearchedMovies');

    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('해리포터');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();
  });

  it('"해리포터"를 검색하면 해리포터 문자열이 포함된 영화 리스트를 보여준다.', () => {
    cy.get(`.${CLASS.ITEM_LIST}`).children().get(`.${CLASS.ITEM_TITLE}`).should('contain.text', '해리 포터');
  });

  it('영화 검색 후 헤더 타이틀을 클릭하면 메인 홈으로 돌아가 지금 인기있는 영화 목록을 보여준다.', () => {
    cy.get('header img[alt="MovieList 로고"]').click();

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.url().should('eq', 'http://localhost:8080/');
    cy.get(`.${CLASS.ITEM_VIEW} > h2`).should('have.text', '지금 인기있는 영화');
    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 20);
  });
});

describe('더보기 버튼 테스트', () => {
  it('더보기 버튼을 클릭하면 영화 리스트를 더 불러와 보여준다.', () => {
    cy.get(`#${ID.LOAD_MORE_BUTTON}`).click();

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 40);
  });

  it('불러온 페이지가 마지막 페이지면 더보기 버튼을 숨긴다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search-mock.json' }
    ).as('getSearchedMovies');

    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('해리포터');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.wait('@getSearchedMovies').then((interception) => {
      const movieItems: MovieAPIResponse = interception.response?.body;
      expect(movieItems.total_pages).to.equal(1);
    });

    cy.get(`#${ID.LOAD_MORE_BUTTON}`).should('not.be.visible');
  });
});
