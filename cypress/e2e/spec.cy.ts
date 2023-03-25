import { FOOTER_MESSAGE, ERROR_LAYOUT_MESSAGE, UNKNOWN_ERROR_MESSAGE } from '../../src/constants';

describe('1. 무한 스크롤 기능 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'sampleMovies.json' },
    );

    cy.visit('/');
  });

  it.skip('스크롤을 아래로 내리면, 영화가 추가로 불러와져야 한다.', () => {
    Array.from({ length: 10 }).forEach(() => {
      cy.scrollTo(0, 9999999, { duration: 500 });
      cy.wait(1000);
    });

    cy.get('.item-list').children().should('have.length', 220);
  });

  it.skip('검색 후, 스크롤을 아래로 내리면, 영화가 추가로 불러와져야 한다.', () => {
    cy.get('#search-input').type('검색어');
    cy.get('#search-button').click();

    cy.get('.item-view h2').should('contain', '"검색어" 검색 결과');

    Array.from({ length: 3 }).forEach(() => {
      cy.scrollTo(0, 9999999, { duration: 500 });
    });

    cy.get('.item-list').children().should('have.length', 80);
  });
});

describe.skip('2. 검색 예외 테스트', () => {
  it.skip('검색 결과가 없는 경우, 영화 목록 없이 안내 메시지를 보여주어야 하며, 스크롤을 하더라도 추가로 검색하지 않아야 한다.', () => {
    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'emptyMovies.json' },
    );

    cy.visit('/');

    cy.get('#search-input').type('검색어');
    cy.get('#search-button').click();

    cy.get('.error-image').should('exist');

    Array.from({ length: 2 }).forEach(() => {
      cy.scrollTo(0, 9999999, { duration: 100 });
      cy.wait(3000);

      cy.get('.item-card').should('not.exist');
      cy.get('.skeleton-item').should('not.exist');
      cy.get('.error-layout .error-title').should('have.text', ERROR_LAYOUT_MESSAGE.noResultTitle);
    });
  });

  it.skip('요청 중 오류가 발생했을 경우, 에러 메시지를 사용자에게 보여주어야 한다.', () => {
    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'wrongData.json' },
    );

    cy.visit('/');

    cy.get('#search-input').type('검색어');
    cy.get('#search-button').click();

    cy.get('.error-image').should('exist');

    cy.get('.item-card').should('not.exist');
    cy.get('.skeleton-item').should('not.exist');
    cy.get('.error-layout .error-title').should('have.text', ERROR_LAYOUT_MESSAGE.errorTitle);
    cy.get('.error-layout .error-message').should('have.text', UNKNOWN_ERROR_MESSAGE);
  });

  it('검색 결과가 더 이상 없을 경우, 검색 결과가 없음을 사용자에게 알려야 한다. 또한, 스켈레톤 이미지들은 보이지 않아야 한다.', () => {
    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'insufficientMovies.json' },
    );

    cy.get('.error-image').should('not.exist');
    cy.get('.item-card').should('exist');
    cy.get('.item-list').children().should('have.length', 10);
    cy.get('.skeleton').should('not.exist');

    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'emptyMovies.json' },
    );

    cy.scrollTo(0, 9999999, { duration: 100 });
    cy.wait(1000);
    cy.scrollTo(0, 9999999, { duration: 100 });

    cy.get('.item-list').children().should('have.length', 10);
    cy.get('.footer-message-wrapper .status-message-content').should(
      'have.text',
      FOOTER_MESSAGE.noMoreMovies,
    );
  });
});

describe('3. 모달 기능 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/movieGenres.*/,
      },
      { fixture: 'movieGenres.json' },
    );

    cy.intercept(
      {
        url: /https:\/\/wzrabbit-movie-review.netlify.app\/.netlify\/functions\/(popularMovies|searchMovies).*/,
      },
      { fixture: 'twinMovies.json' },
    );

    cy.visit('/');
    cy.wait(3000);
  });

  it.skip('영화 항목을 클릭할 경우, 영화에 대한 정보를 보여주어야 한다.', () => {
    cy.get('.information-modal-wrapper').should('have.attr', 'hidden');
    cy.get('.item-card').eq(0).click();
    cy.get('.information-modal-wrapper').should('not.have.attr', 'hidden');

    cy.get('.modal-text').eq(0).should('have.text', '로맨스, 액션, 코미디, 범죄, 공포');
    cy.get('.modal-text').eq(1).should('have.text', '6.5');
    cy.get('.information-modal-content').should('have.text', '첫 번째 영화에 대한 설명.');
  });

  it.skip('Escape 키를 누르거나, X 버튼을 누르거나, 빈 공간을 누르면 모달이 닫혀야 한다.', () => {
    cy.get('.item-card').eq(0).click();
    cy.get('.information-modal-wrapper').should('not.have.attr', 'hidden');
    cy.get('.modal-close-button').click();
    cy.get('.information-modal-wrapper').should('have.attr', 'hidden');

    cy.get('.item-card').eq(0).click();
    cy.get('.information-modal-wrapper').should('not.have.attr', 'hidden');
    cy.get('body').type('{esc}');
    cy.get('.information-modal-wrapper').should('have.attr', 'hidden');

    cy.get('.item-card').eq(0).click();
    cy.get('.information-modal-wrapper').should('not.have.attr', 'hidden');
    cy.get('.information-modal-backdrop').click({ force: true });
    cy.get('.information-modal-wrapper').should('have.attr', 'hidden');
  });

  it('영화의 정보가 누락되어 있다면, 그에 알맞은 메시지를 보여주어야 한다.', () => {
    cy.get('.item-card').eq(1).click();

    cy.get('.modal-text').eq(0).should('contain.text', '???');
    cy.get('.information-modal-content').should(
      'have.text',
      '이 영화는 별도의 영화에 대한 설명이 없네요!',
    );
  });

  it('별점을 준 후, 모달을 닫고 다시 열어도 별점이 유지되어야 한다.', () => {
    cy.get('.item-card').eq(0).click();
    cy.get('.user-rating-bar input[name="rating"]').eq(1).click();
    cy.get('.modal-text.user-rating-score').should('contain.text', '8');

    cy.get('.information-modal-backdrop').click({ force: true });
    cy.get('.item-card').eq(0).click();
    cy.get('.modal-text.user-rating-score').should('contain.text', '8');
  });
});
