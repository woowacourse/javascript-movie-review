import { Movie } from '../../src/type/Movie';

beforeEach(() => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture: 'movie-popular.json' }
  ).as('getPopularMovies');

  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
    },
    { fixture: 'movie-search.json' }
  ).as('getSearchedMovies');

  cy.viewport('macbook-13');

  cy.visit('http://localhost:8080/');
});

describe('영화 리뷰 E2E 테스트', () => {
  it('첫 화면엔 인기 영화목록이 렌더링된다. ', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((movie: Movie) => {
        cy.contains(movie.title).should('be.visible');
      });
    });
  });

  it('영화 포스터를 누르면 상세 정보 모달 창이 나타난다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();

      cy.get('.movie-genre').should('be.visible');
      cy.get('.movie-overview').should('be.visible');
    });
  });

  it('모달 창은 닫기 버튼을 누르면 사라진다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();
      cy.get('.button--close').click();

      cy.get('.movie-genre').should('not.be.visible');
      cy.get('.movie-overview').should('not.be.visible');
    });
  });

  it('모달 창은 ESC를 누르면 사라진다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();
      cy.get('body').type('{esc}');

      cy.get('.movie-genre').should('not.be.visible');
      cy.get('.movie-overview').should('not.be.visible');
    });
  });

  it('모달 창에서 별점을 줄 수 있다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();
      cy.get('[for="rating3"]').click();

      cy.get('#rating-number').should('have.text', '6');
      cy.get('#rating-comment').should('have.text', '보통이에요');
    });
  });

  it('별점은 모달 창을 닫고 다시 열어도 유지된다.', () => {
    cy.wait('@getPopularMovies').then(() => {
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();
      cy.get('[for="rating4"]').click();
      cy.get('body').type('{esc}');
      cy.get(':nth-child(2) > :nth-child(1) > .item-card > .item-thumbnail').click();

      cy.get('#rating-number').should('have.text', '8');
      cy.get('#rating-comment').should('have.text', '재밌어요');
    });
  });

  it('맨 밑으로 스크롤을 내리면 20개의 영화를 추가로 불러온다.', () => {
    cy.scrollTo('bottom');

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((movie: Movie) => {
        cy.contains(movie.title).should('be.visible');
      });
    });
  });

  it("제목에 '해리 포터'가 포함된 영화를 검색할 수 있다.", () => {
    cy.get('input').type('해리 포터');
    cy.get('.search-box').submit();

    cy.wait('@getSearchedMovies').then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((movie: Movie) => {
        cy.contains(movie.title).should('be.visible');
      });
    });
  });
});
