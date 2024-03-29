import { getPopularURL, getSearchURL } from '../utils/createURL';

describe('무한 스크롤 테스트', () => {
  context('인기 영화 리스트에서 무한 스크롤 테스트', () => {
    it('인기 영화 리스트 화면에서 스크롤을 끝까지 한다면, 인기 영화 리스트에 20개의 이하의 영화가 추가된다.', () => {
      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(1),
        },
        { fixture: 'movie-popular-page1.json' },
      ).as('getPopularMovies1');

      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(2),
        },
        { fixture: 'movie-popular-page2.json' },
      ).as('getPopularMovies2');

      cy.visitMainPage();

      cy.wait('@getPopularMovies1').then((intercept) => {
        cy.scrollBottom();
        cy.wait('@getPopularMovies2').then((intercept) => {
          cy.get('.movie-list-container').within(() => {
            cy.get('.movie-list').then(($elements) => {
              expect($elements.length).to.be.at.most(40);
            });
          });
        });
      });
    });

    it('인기 영화 리스트에서 더 이상 불러올 영화 데이터가 없다면 "END"문구가 나온다.', () => {
      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(1),
        },
        { fixture: 'movie-popular-page1.json' },
      ).as('getPopularMovies1');

      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(2),
        },
        { fixture: 'movie-popular-last-page.json' },
      ).as('getPopularMoviesLast');

      cy.visitMainPage();

      cy.wait('@getPopularMovies1').then((intercept) => {
        //더 불러올 영화 리스트가 있다면, END 는 보이지 않는다.
        cy.get('.no-more-movie-data').should('not.be.visible');
        cy.scrollBottom();

        cy.wait('@getPopularMoviesLast').then((intercept) => {
          cy.get('.no-more-movie-data').should('be.visible');
        });
      });
    });

    context('영화 검색 리스트에서의 무한 스크롤 테스트', () => {
      it('영화 검색 리스트 화면에서 스크롤을 끝까지 한다면, 영화 검색 리스트에 20개의 이하의 영화가 추가된다.', () => {
        cy.intercept(
          {
            method: 'GET',
            url: getPopularURL(1),
          },
          { fixture: 'movie-popular-page1.json' },
        ).as('getPopularMovies');

        cy.intercept(
          {
            method: 'GET',
            url: getSearchURL(1),
          },
          { fixture: 'movie-search-page1.json' },
        ).as('getSearchMovies1');
        cy.intercept(
          {
            method: 'GET',
            url: getSearchURL(2),
          },
          { fixture: 'movie-search-page2.json' },
        ).as('getSearchMovies2');

        cy.visitMainPage();

        cy.wait('@getPopularMovies').then((intercept) => {
          // 검색
          const TITLE = '행복';
          cy.get('#search-input').type(TITLE);
          cy.get('.search-button').click();

          cy.wait('@getSearchMovies1').then((intercept) => {
            cy.scrollBottom();

            cy.wait('@getSearchMovies2').then((intercept) => {
              cy.get('.movie-list-container').within(() => {
                cy.get('.movie-list').then(($elements) => {
                  expect($elements.length).to.be.at.most(40);
                });
              });
            });
          });
        });
      });

      it('영화 검색 리스트에서 더 이상 불러올 영화 데이터가 없다면 "END"문구가 나온다.', () => {
        cy.intercept(
          {
            method: 'GET',
            url: getPopularURL(1),
          },
          { fixture: 'movie-popular-page1.json' },
        ).as('getPopularMovies1');

        cy.intercept(
          {
            method: 'GET',
            url: getPopularURL(2),
          },
          { fixture: 'movie-popular-last-page.json' },
        ).as('getPopularMoviesLast');

        cy.visitMainPage();

        cy.wait('@getPopularMovies1').then((intercept) => {
          //더 불러올 영화 리스트가 있다면, END 는 보이지 않는다.
          cy.get('.no-more-movie-data').should('not.be.visible');
          cy.scrollBottom();

          cy.wait('@getPopularMoviesLast').then((intercept) => {
            cy.get('.no-more-movie-data').should('be.visible');
          });
        });
      });
    });
  });
});
