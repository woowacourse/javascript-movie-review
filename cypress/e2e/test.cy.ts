import { MATCHED_MOVIES, POPULAR_MOVIES } from '../../src/constants/url';

describe('API test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('인기 영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      POPULAR_MOVIES +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
      });

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('영화 검색 API를 호출하면 검색 결과가 20개가 넘는 경우에 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const matchedMovieUrl =
      MATCHED_MOVIES +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
        query: '쿵푸',
      });

    cy.request('GET', matchedMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});

describe('Movie Review app E2E test', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/ },
      { fixture: 'movie-matched.json' },
    ).as('getMatchedMovies');

    cy.visit('/');
  });

  it('처음 실행됐을 때, 모든 component가 정상적으로 생성되어야 한다.', () => {
    cy.get('header').should('exist');
    cy.get('header').find('.search-box').should('exist');
    cy.get('main').should('exist');
    cy.get('main').find('.btn').should('exist');
  });

  it('처음 실행됐을 때, 인기있는 영화 화면을 보여준다.', () => {
    cy.get('main').find('h2').should('have.text', '지금 인기 있는 영화');
  });

  describe('Flow: 인기있는 영화에서 "더보기" 버튼을 누른 경우', () => {
    it('인기있는 영화의 첫 화면에서 20개의 영화 정보를 보여준다.', () => {
      cy.get('.item-card').should('have.length', 20);
    });

    it('초기 인기있는 영화 화면에서 "더보기" 버튼을 클릭한 경우, 로딩이 완료되기 전까지 20개의 movie skeleton UI를 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { fixture: 'movie-popular-2.json', delay: 1000 },
      ).as('getPopularMovies');

      cy.get('.btn').click();
      cy.get('.item-card.skeleton').should('have.length', 20);
    });

    it('초기 인기있는 영화 화면에서 "더보기" 버튼을 클릭한 경우, 2번째 인기영화 결과의 20개를 추가로 보여준다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { fixture: 'movie-popular-2.json', delay: 1000 },
      ).as('getPopularMovies');

      const buttonClick = cy.get('.btn').click();
      cy.get('.item-card.skeleton').should('have.length', 20);

      buttonClick.then(() => {
        cy.get('.item-card.skeleton').should('not.exist');
        cy.get('.item-card').should('have.length', 40);
      });
    });
  });

  describe('Flow: 검색어 입력을 통한 영화 검색', () => {
    it('검색어를 입력 후 검색 버튼을 누르면 해당 검색어에 대한 초기 검색 결과 20개를 보여준다.', () => {
      cy.get('input').type('쿵푸');
      cy.get('.search-button')
        .click()
        .then(() => {
          cy.get('.item-card').should('have.length', 20);
        });
    });

    it('검색어를 입력 후 Enter 키를 누르면 해당 검색어에 대한 초기 검색 결과 20개를 보여준다.', () => {
      cy.get('input')
        .type('쿵푸{enter}')
        .then(() => {
          cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
          cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
          cy.get('.item-card').should('have.length', 20);
        });
    });

    it('초기 검색 결과 화면에서 "더보기" 버튼을 클릭한 경우, 로딩이 완료되기 전까지 20개의 movie skeleton UI를 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { fixture: 'movie-matched-2.json', delay: 1000 },
      ).as('getPopularMovies');

      cy.get('.btn').click();
      cy.get('.item-card.skeleton').should('have.length', 20);
    });

    it('초기 검색 결과 화면에서 "더보기" 버튼을 클릭한 경우, 2번째 검색 결과의 20개를 추가로 보여준다.', () => {
      cy.get('input')
        .type('쿵푸{enter}')
        .then(() => {
          cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
          cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
          cy.get('.item-card').should('have.length', 20);
        });
    });

    it('검색어에 대한 영화 목록이 더이상 없을 경우 더보기 버튼을 출력하지 않고, "더이상 불러올 목록이 없어요. :(" UX writing을 출력한다.', () => {
      cy.get('input').type('ㅁ');

      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/ },
        { fixture: 'movie-none.json' },
      ).as('getNoneMovie');

      cy.get('.search-button')
        .click()
        .then(() => {
          cy.get('.item-card').should('not.exist');
          cy.get('.btn').should('be.disabled');
          cy.get('.btn').should('have.text', '더이상 불러올 목록이 없어요. :(');
        });
    });
  });

  describe('Flow: 검색 결과 화면에서 좌상단 로고를 누른 경우', () => {
    it('검색 결과 화면에서 좌상단 로고를 클릭하면 인기있는 영화 화면으로 전환되어 인기 영화 20개를 출력한다.', () => {
      cy.get('input')
        .type('쿵푸{enter}')
        .then(() => {
          cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
          cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
          cy.get('.item-card').should('have.length', 20);
        });
      cy.get('header')
        .find('img')
        .click()
        .then(() => {
          cy.get('.item-view').find('h2').should('have.text', '지금 인기있는 영화');
          cy.get('.item-card').eq(1).find('.item-title').should('have.text', '댐즐');
          cy.get('.item-card').should('have.length', 20);
        });
    });
  });
});

describe('Flow: API 오류가 생긴 경우', () => {
  it('Access Token이 잘못된 경우[401 ERROR] "접근 권한이 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.clearAllCookies();
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { statusCode: 401 },
    );
    cy.visit('/');
    cy.get('main').should('have.text', '접근 권한이 없어요 :(');
  });

  it('API url이 잘못된 경우[404 ERROR] "잘못된 URL로 접근했어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.clearAllCookies();
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { statusCode: 404 },
    );
    cy.visit('/');
    cy.get('main').should('have.text', '잘못된 URL로 접근했어요 :(');
  });

  it('서버에 일시적인 문제가 있을 경우[500 ERROR] "서버에 일시적인 문제가 있어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.clearAllCookies();
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { statusCode: 500 },
    );
    cy.visit('/');
    cy.get('main').should('have.text', '서버에 일시적인 문제가 있어요 :(');
  });

  it('서비스를 이용할 수 없는 경우[503 ERROR] "서비스를 이용할 수 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.clearAllCookies();
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { statusCode: 503 },
    );
    cy.visit('/');
    cy.get('main').should('have.text', '서비스를 이용할 수 없어요 :(');
  });
});
