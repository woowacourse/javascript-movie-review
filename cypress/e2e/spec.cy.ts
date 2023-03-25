import { starFilledImage } from '../../src/assets/images';
import { CLASS, ID } from '../../src/constants/selector';
import type { Movie } from '../../src/types/movie';

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

describe('메인 화면과 무한 스크롤 테스트', () => {
  it('앱을 실행하면 지금 인기있는 영화 리스트를 보여준다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 20);
  });

  it('밑으로 스크롤 하면 영화 리스트를 더 불러와 보여준다.', () => {
    cy.scrollTo('bottom');

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });
    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 40);
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
    cy.wait('@getSearchedMovies').then((interception) => {
      const movieItems: Movie[] = interception.response?.body.results;
      expect(movieItems.length).to.equal(8);

      movieItems.forEach((item) => {
        expect(item.title).to.contain('해리 포터');
      });
    });

    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 8);
  });

  it('영화 검색 후 헤더 타이틀 버튼을 클릭하면 지금 인기있는 영화 목록을 보여준다.', () => {
    cy.get(`.${CLASS.PAGE_TITLE_BUTTON}`).click();
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular-mock.json' }
    ).as('getPopularMovies');

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 20);
  });
});

describe('영화 모달 테스트', () => {
  it('모달에서 별점을 매긴 후 나와 다시 들어가도 변경 사항이 유지 된다.', () => {
    const starFilledImage = '6c9611deedf4b85849c9.png';
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/*/,
      },
      { fixture: 'movie-by-id-mock.json' }
    ).as('getMovieById');

    cy.get(`.${CLASS.ITEM_CARD}`).first().click();

    cy.wait('@getMovieById').then((interception) => {
      const movieItem = interception.response?.body;
      expect(movieItem.id).to.equal(315162);
    });

    cy.get("[data-rate='3']").click();
    cy.get('#movie-detail-close').click();
    cy.get(`.${CLASS.ITEM_CARD}`).first().click();
    cy.get("[data-rate='1']").should('have.attr', 'src').should('include', starFilledImage);
    cy.get("[data-rate='2']").should('have.attr', 'src').should('include', starFilledImage);
    cy.get("[data-rate='3']").should('have.attr', 'src').should('include', starFilledImage);
  });
});
