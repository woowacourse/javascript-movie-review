describe('영화 리뷰 앱 E2E 테스트', () => {
  // 💡 테스트에 사용할 가짜(Mock) 데이터
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
    // TMDB API 의존성을 끊고 테스트 환경을 통제하기 위해 API 요청을 가로챕니다.
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
      cy.visit('http://localhost:5173/'); // 💡 본인의 로컬 서버 주소에 맞게 수정하세요!
      cy.wait('@getPopularMovies');

      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('더보기 버튼을 누르면 다음 페이지의 영화 20개를 추가로 렌더링한다.', () => {
      cy.visit('http://localhost:5173/');
      cy.wait('@getPopularMovies');

      cy.get('#more-page-button').click();
      cy.wait('@getNextPopularMovies');

      // 기존 20개 + 추가 20개 = 40개
      cy.get('.thumbnail-list > li').should('have.length', 40);
    });
  });

  context('2. 검색 기능', () => {
    it('검색창에 검색어를 입력하고 엔터를 누르면 검색 결과 페이지로 이동한다.', () => {
      // 💡 한글 검색어를 URL 인코딩하여 intercept 주소에 넣습니다.
      const encodedQuery = encodeURIComponent('해리포터');
      
      cy.intercept('GET', `**/search/movie?*query=${encodedQuery}*`, {
        statusCode: 200,
        body: mockMovies, 
      }).as('getSearchMovies');

      cy.visit('http://localhost:5173/');
      
      // 검색창에 '해리포터' 입력 후 엔터
      cy.get('input[name="q"]').type('해리포터{enter}');
      cy.wait('@getSearchMovies');

      // URL 확인 및 결과 렌더링 확인
      cy.url().should('include', `/search.html?q=${encodedQuery}`); 
      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('검색 결과가 없는 경우 "검색 결과가 없습니다" UI를 띄워준다.', () => {
      const emptyMockData = { page: 1, results: [], total_pages: 0 };
      
      // 💡 여기도 마찬가지로 'ㅇㅅㅇ'을 인코딩 처리합니다.
      const encodedEmptyQuery = encodeURIComponent('ㅇㅅㅇ');
      
      cy.intercept('GET', `**/search/movie?*query=${encodedEmptyQuery}*`, {
        statusCode: 200,
        body: emptyMockData,
      }).as('getEmptyMovies');

      cy.visit('http://localhost:5173/');
      cy.get('input[name="q"]').type('ㅇㅅㅇ{enter}');
      cy.wait('@getEmptyMovies');

      // empty UI 확인
      cy.get('.empty-result').should('be.visible');
      cy.get('.empty-result p').contains('"ㅇㅅㅇ" 검색 결과가 없습니다.');
    });
  });

  context('3. 예외 처리 (API 에러)', () => {
    it('네트워크 통신에 실패할 경우 alert 창을 통해 사용자에게 에러를 알린다.', () => {
      // 💡 의도적으로 500 에러를 발생시킵니다.
      cy.intercept('GET', '**/movie/popular?*', {
        statusCode: 500,
      }).as('getApiError');

      // alert가 발생하는지 감시(stub)합니다.
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.visit('http://localhost:5173/');
      cy.wait('@getApiError').then(() => {
        // 에러 발생 시 우리가 작성한 경고창 문구가 뜨는지 검증합니다.
        expect(alertStub.getCall(0)).to.be.calledWith('영화 목록을 불러오지 못했습니다!');
      });
    });
  });
});