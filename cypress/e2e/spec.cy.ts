describe('영화 리뷰 앱 E2E 테스트', () => {
  // 테스트에 사용할 Mock 데이터
  const mockMovies = {
    page: 1,
    results: Array.from({ length: 20 }, (_, i) => ({
      title: `테스트 영화 ${i}`,
      poster_path: `/test-path-${i}.jpg`,
      vote_average: 8.5,
    })),
    total_pages: 5,
  };

  const mockNextMovies = {
    page: 2,
    results: Array.from({ length: 20 }, (_, i) => ({
      title: `테스트 영화 페이지2 - ${i}`,
      poster_path: `/test-path-page2-${i}.jpg`,
      vote_average: 9.0,
    })),
    total_pages: 5,
  };

  beforeEach(() => {
    // TMDB API 의존성을 끊기
    cy.intercept('GET', '**/movie/popular?*page=1*', {
      statusCode: 200,
      body: mockMovies,
    }).as('getPopularMovies');

    cy.intercept('GET', '**/movie/popular?*page=2*', {
      statusCode: 200,
      body: mockNextMovies,
    }).as('getNextPopularMovies');
  });

  context('1. 메인 페이지 (인기 영화)', () => {
    it('메인 페이지에 접속하면 인기 영화 20개를 렌더링한다.', () => {
      cy.visit('/');
      cy.wait('@getPopularMovies');

      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    // it('더보기 버튼을 누르면 다음 페이지의 영화 20개를 추가로 렌더링한다.', () => {
    //   cy.visit('/');
    //   cy.wait('@getPopularMovies');

    //   cy.get('#more-page-button').click();
    //   cy.wait('@getNextPopularMovies');

    //   // 기존 20개 + 추가 20개 = 40개
    //   cy.get('.thumbnail-list > li').should('have.length', 40);
    // });
  });

  context('2. 검색 기능', () => {
    it('검색창에 검색어를 입력하고 엔터를 누르면 검색 결과 페이지로 이동한다.', () => {
      const encodedQuery = encodeURIComponent('해리포터');

      cy.intercept('GET', `**/search/movie?*query=${encodedQuery}*`, {
        statusCode: 200,
        body: mockMovies,
      }).as('getSearchMovies');

      cy.visit('/');

      // 검색창에 '해리포터' 입력 후 엔터
      cy.get('input[name="q"]').type('해리포터{enter}');
      cy.wait('@getSearchMovies');

      // URL 확인 및 결과 렌더링 확인
      cy.url().should('include', `/search.html?q=${encodedQuery}`);
      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('검색 결과가 없는 경우 "검색 결과가 없습니다" UI를 띄워준다.', () => {
      const emptyMockData = { page: 1, results: [], total_pages: 0 };

      const encodedEmptyQuery = encodeURIComponent('ㅇㅅㅇ');

      cy.intercept('GET', `**/search/movie?*query=${encodedEmptyQuery}*`, {
        statusCode: 200,
        body: emptyMockData,
      }).as('getEmptyMovies');

      cy.visit('/');
      cy.get('input[name="q"]').type('ㅇㅅㅇ{enter}');
      cy.wait('@getEmptyMovies');

      // empty UI 확인
      cy.get('.empty-result').should('be.visible');
      cy.get('.empty-result p').contains('"ㅇㅅㅇ" 검색 결과가 없습니다.');
    });
  });

  context('3. 예외 처리 및 재시도 검증', () => {
    it('네트워크 에러 발생 시 UI를 복구하고, 재시도 시 동일한 페이지를 다시 요청한다.', () => {
      // 모든 앱 에러 무시
      cy.on('uncaught:exception', () => false);

      // 500 에러로 모킹
      cy.intercept('GET', '**/movie/popular?*page=1*', {
        statusCode: 500,
      }).as('getApiError');

      // alert 감시
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'alert').as('alertWindow');
        },
      });

      // 에러 상황 발생 후 UI 상태 확인
      cy.wait('@getApiError');
      cy.get('@alertWindow').should('have.been.calledWithMatch', /불러오지 못했습니다/);
      cy.get('.skeleton-container').should('not.exist');
      cy.get('#more-page-button').should('be.visible'); // 버튼이 다시 살아나야 함

      // 재시도 검증 (버튼을 다시 눌렀을 때 페이지 1을 다시 요청하는가?)
      // 성공(200)하도록 모킹 바꿈
      cy.intercept('GET', '**/movie/popular?*page=1*', {
        fixture: 'page_1.json',
      }).as('retrySuccess');

      // 더보기 버튼 클릭
      cy.get('#more-page-button').click();

      // 재시도 성공 확인
      cy.wait('@retrySuccess');
      cy.get('.thumbnail-list li').should('have.length', 20);
    });
  });
});
