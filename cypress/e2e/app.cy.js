const TEST_URL = 'http://localhost:8080/';

const API_KEY = Cypress.env('apiKey');

describe('영화 사이트 테스트', () => {
  beforeEach('beforeEach', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');
    cy.visit(TEST_URL);
    cy.log(API_KEY);
  });

  it('웹 페이지에 방문하면, 영화 리스트를 확인할 수 있다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response.body.results;

      movieItems.forEach((movieData) => {
        cy.get('.item-list').should('contain', movieData.title);
      });
    });
  });

  it('더 보기 버튼을 누르면, 추가로 영화 리스트를 확인할 수 있다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
      },
      { fixture: 'movie-popular2.json' }
    ).as('getPopularMovies2');

    cy.get('.btn')
      .click()
      .wait('@getPopularMovies2')
      .then((interception) => {
        const movieItems = interception.response.body.results;

        movieItems.forEach((movieData) => {
          cy.get('.item-list').should('contain', movieData.title);
        });
      });
  });

  it('영화를 검색 하면(enter), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=%ED%95%B4%EB%A6%AC%ED%8F%AC%ED%84%B0&page=1`,
      },
      { fixture: 'harry-potter.json' }
    ).as('getHarryPotter');

    cy.get('#searchMovie')
      .type('해리포터{enter}')
      .wait('@getHarryPotter')
      .then((interception) => {
        const movieItems = interception.response.body.results;

        movieItems.forEach((movieData) => {
          cy.get('.item-list').should('contain', movieData.title);
        });
      });
  });

  it('영화를 검색 하면(클릭), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=%ED%95%B4%EB%A6%AC%ED%8F%AC%ED%84%B0&page=1`,
      },
      { fixture: 'harry-potter.json' }
    ).as('getHarryPotter');

    cy.get('.search-box').type('해리포터');
    cy.get('.search-button')
      .click()
      .wait('@getHarryPotter')
      .then((interception) => {
        const movieItems = interception.response.body.results;

        movieItems.forEach((movieData) => {
          cy.get('.item-list').should('contain', movieData.title);
        });
      });
  });
});
