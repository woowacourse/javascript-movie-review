/// <reference types="cypress" />

describe('영화 리뷰 미션 - E2E 테스트', () => {
  beforeEach(() => {
    Array.from({ length: 3 }, (v, i) => i + 1).forEach((page) => {
      cy.intercept(
        {
          url: `https://api.themoviedb.org/3/movie/popular?*`,
          query: { page: `${page}` },
        },
        { fixture: `popular/page-${page}.json` },
      );
    });

    Array.from({ length: 3 }, (v, i) => i + 1).forEach((page) => {
      cy.intercept(
        {
          url: `https://api.themoviedb.org/3/3/search/movie?*`,
          query: { page: `${page}`, query: '해리' },
        },
        { fixture: `search/해리/page-${page}.json` },
      );
    });

    cy.intercept(
      {
        url: `https://api.themoviedb.org/3/3/search/movie?*`,
        query: { query: 'Avatar' },
      },
      { fixture: 'search/Avatar/page-1.json' },
    );

    cy.intercept(
      {
        url: `https://api.themoviedb.org/3/3/search/movie?*`,
        query: { query: '요술토끼' },
      },
      { fixture: 'search/요술토끼/page-1.json' },
    );

    const movieId = '315162';
    cy.intercept(
      {
        url: `https://api.themoviedb.org/3/movie/${movieId}?*`,
      },
      { fixture: `movieId/${movieId}.json` },
    );

    cy.visit('/');
  });

  it('메인화면에서 스크롤을 내리면, 영화들을 추가로 보여준다.', () => {
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });

    cy.get('.item-list').children().should('have.length.gte', 40);
  });

  it('"해리" 검색 후 계속 스크롤을 내리다가 더이상 해당 키워드를 가진 영화가 없을 경우 스크롤은 동작하지 않는다.', () => {
    cy.get('#search-input').type('해리{enter}');

    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });

    cy.get('.item-view h2').should('contain', 'Search Results of "해리"');
    cy.get('.item-list').children().should('contain', 'Harry');
    cy.get('.scroll-target').should('contain', 'There are no more movies to load.');
  });

  it('"Avatar"를 검색하면, 해당 키워드를 가진 영화들을 보여준다.', () => {
    cy.get('#search-input').type('Avatar');
    cy.get('#search-button').click();

    cy.get('.item-view h2').should('contain', 'Search Results of "Avatar"');
    cy.get('.item-list').children().should('contain', 'Avatar');
  });

  it('"요술토끼"를 검색했을 때 검색결과가 없는 경우 결과가 없다는 것을 알리는 페이지를 보여준다.', () => {
    cy.get('#search-input').type('요술토끼{enter}');

    cy.get('.item-view h2').should('contain', 'Search Results of "요술토끼"');
    cy.get('.item-list').children().should('contain', 'No search results were found.');
  });

  it('모바일 화면에서 영화를 검색하려고 할 때 검색창이 움직인다.', () => {
    cy.viewport(375, 667);
    cy.get('#search-input').focus();

    cy.get('#search-input').type('요술토끼');
    cy.get('#search-input').should('have.css', 'transition');
  });

  it('영화를 클릭하면 상세정보를 확인할 수 있다.', () => {
    cy.viewport(768, 1024);

    cy.get('.item-list').find(`[data-id='315162']`).click();

    cy.get('.movie-title').should('contain', 'Puss in Boots: The Last Wish');
    cy.get('.genre-vote-average-container').should('contain', 'Animation,Adventure,Comedy,Family');
    cy.get('.genre-vote-average-container').should('contain', '8.329');
    cy.get('.movie-overview').should(
      'contain',
      'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
    );
  });

  it('영화 상세정보에서 별점을 매긴 후 새로고침해도 정보가 유지된다.', () => {
    cy.viewport(768, 1024);

    cy.get('.item-list').find(`[data-id='315162']`).click();
    cy.get('.star-container').find(`[data-value='5']`).click();
    cy.get('#movie-detail-modal-close-button').click();
    cy.get('.item-list').find(`[data-id='315162']`).click();

    cy.get('.star-rating-container').should('contain', 'Masterpiece');
  });
});
