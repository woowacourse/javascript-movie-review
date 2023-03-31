import { CLASS, ID } from '../../src/constants/selector';

describe('메인 화면 테스트', () => {
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

  it('앱을 실행하면 지금 인기있는 영화 리스트 20개를 보여준다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });

    cy.get(`.${CLASS.ITEM_VIEW} > h2`).should('have.text', '지금 인기있는 영화');
    cy.get(`.${CLASS.ITEM_LIST}`).children().should('have.length', 20);
  });

  it('헤더 타이틀을 클릭하면 메인 홈으로 돌아가 지금 인기있는 영화 목록을 보여준다.', () => {
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

describe('영화 검색 테스트', () => {
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

  it('"해리포터"를 검색하면 해리포터 문자열이 포함된 영화 리스트를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search-mock.json' }
    ).as('getSearchedMovies');

    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('해리포터');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.get(`.${CLASS.ITEM_VIEW} > h2`).should('have.text', '"해리포터" 검색 결과');
    cy.get(`.${CLASS.ITEM_LIST}`).children().get(`.${CLASS.ITEM_TITLE}`).should('contain.text', '해리 포터');
  });

  it('빈 값을 검색하면 "빈 값이나 스페이스는 검색할 수 없습니다." 문구의 툴팁을 보여준다.', () => {
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.get('.search-tooltip')
      .find('.tooltip')
      .should('be.visible')
      .find('p')
      .should('have.text', '빈 값이나 스페이스는 검색할 수 없습니다.');
  });

  it('스페이스 문자열을 검색하면 "빈 값이나 스페이스는 검색할 수 없습니다." 문구의 툴팁을 보여준다.', () => {
    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('    ');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.get('.search-tooltip')
      .find('.tooltip')
      .should('be.visible')
      .find('p')
      .should('have.text', '빈 값이나 스페이스는 검색할 수 없습니다.');
  });

  it('이전 검색 값과 같은 값을 검색하면 "같은 입력 값을 검색했습니다." 문구의 툴팁을 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-search-mock.json' }
    );

    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('해리포터');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.get('.search-tooltip').find('.tooltip').should('be.visible').find('p').should('have.text', '같은 입력 값을 검색했습니다.');
  });

  it('검색 결과가 없으면 "🔎 검색 결과가 없습니다. 🔎"를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-empty-mock.json' }
    ).as('getEmptyMovie');

    cy.get(`#${ID.MOVIE_SEARCH_FORM} input`).type('asdf');
    cy.get(`#${ID.MOVIE_SEARCH_FORM}`).submit();

    cy.wait('@getEmptyMovie').then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(0);
    });

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '🔎 검색 결과가 없습니다. 🔎');
  });
});

describe('요청 실패 테스트', () => {
  it('에러가 발생하면 리스트와 버튼을 숨긴다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 400 }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_LIST}`).should('not.be.visible');
  });

  it('400에러가 발생하면 "잘못된 요청입니다."를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 400 }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '잘못된 요청입니다.');
  });

  it('403에러가 발생하면 "접근 권한이 없습니다."를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 403 }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '접근 권한이 없습니다.');
  });

  it('404에러가 발생하면 "요청한 리소스를 찾을 수 없습니다."를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 404 }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '요청한 리소스를 찾을 수 없습니다.');
  });

  it('500에러가 발생하면 "서버 내부 오류가 발생했습니다."를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 500 }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '서버 내부 오류가 발생했습니다.');
  });

  it('네트워크 에러가 발생하면 "알 수 없는 오류가 발생했습니다."를 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { forceNetworkError: true }
    );

    cy.visit('http://localhost:8080/');

    cy.get(`.${CLASS.ITEM_VIEW}`)
      .find(`.${CLASS.MESSAGE}`)
      .should('be.visible')
      .find('.message-title')
      .should('have.text', '알 수 없는 오류가 발생했습니다.');
  });
});
