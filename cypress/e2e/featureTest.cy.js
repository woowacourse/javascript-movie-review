describe('1단계 - 영화 목록 불러오기 테스트', () => {
  beforeEach(() => {
    // 토큰 기반 인증 방식으로 변경된 API 요청 패턴 업데이트
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
      { fixture: 'popular_movies_page1.json' },
    ).as('getPopularMoviesPage1');

    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=2',
      { fixture: 'popular_movies_page2.json' },
    ).as('getPopularMoviesPage2');

    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/search/movie?language=ko-KR&query=%EC%A7%B1%EA%B5%AC&page=1',
      { fixture: 'search_movies_page1.json' },
    ).as('getSearchPage1');

    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/search/movie?language=ko-KR&query=%EC%A7%B1%EA%B5%AC&page=2',
      { fixture: 'search_movies_page2.json' },
    ).as('getSearchPage2');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie(?!.*query=%EC%A7%B1%EA%B5%AC)/,
      },
      { fixture: 'no_results.json' },
    ).as('getNoResults');

    cy.visit('http://localhost:5173');
    cy.viewport(1024, 768);
  });

  describe('초기 렌더링', () => {
    it('사용자가 처음 화면에 들어왔을때 인기있는 영화 20개가 렌더링 된다.', () => {
      // 요청이 완료될 때까지 기다림
      cy.wait('@getPopularMoviesPage1', { timeout: 10000 });
      
      // 로딩 상태가 사라질 때까지 기다림
      cy.get('.skeleton-card').should('not.exist', { timeout: 10000 });
      
      cy.get('.thumbnail-list li').should('have.length', 20);
    });

    it('사용자가 스크롤을 내리면 영화가 추가로 렌더링 된다.', () => {
      cy.wait('@getPopularMoviesPage1', { timeout: 10000 });
      cy.get('.thumbnail-list li').should('have.length', 20);
      
      // 스크롤 이벤트 시뮬레이션 - 무한 스크롤 방식으로 변경되었을 경우
      cy.scrollTo('bottom');
      
      cy.wait('@getPopularMoviesPage2', { timeout: 10000 });
      cy.get('.skeleton-card').should('not.exist', { timeout: 10000 });
      
      cy.get('.thumbnail-list li').should('have.length.gt', 20);
    });
  });

  describe('검색 기능', () => {
    it('사용자가 키워드(영화가 존재하는)를 검색하면 관련 영화가 최대 20개 렌더링 된다.', () => {
      cy.get('.search-bar-input').type('짱구');
      cy.get('.search-bar-button').click();
      
      cy.wait('@getSearchPage1', { timeout: 10000 });
      cy.get('.skeleton-card').should('not.exist', { timeout: 10000 });
      
      cy.get('.thumbnail-list li').should('have.length.lte', 20);
      cy.get('.movie-list-title').should('contain', '짱구');
    });

    it('사용자가 스크롤을 내리면 추가 검색 결과가 렌더링 된다.', () => {
      cy.get('.search-bar-input').type('짱구');
      cy.get('.search-bar-button').click();
      
      cy.wait('@getSearchPage1', { timeout: 10000 });
      cy.get('.skeleton-card').should('not.exist', { timeout: 10000 });
      
      // 스크롤 이벤트 시뮬레이션
      cy.scrollTo('bottom');
      
      cy.wait('@getSearchPage2', { timeout: 10000 });
      cy.get('.skeleton-card').should('not.exist', { timeout: 10000 });
      
      cy.get('.thumbnail-list li').should('have.length.gt', 20);
    });

    it('페이지 끝에 도달한 경우 스크롤해도 더 이상 결과가 로드되지 않는다.', () => {
  // 초기 항목 수를 기록
  let initialItemCount = 0;
  let lastItemCount = 0;
  let scrollAttempts = 0;
  const maxScrollAttempts = 5; // 최대 스크롤 시도 횟수 제한
  
  // 검색 실행
  cy.get('.search-bar-input').type('짱구');
  cy.get('.search-bar-button').click();
  cy.wait('@getSearchPage1', { timeout: 10000 });
  
  // 초기 항목 수 저장
  cy.get('.thumbnail-list li').then(($items) => {
    initialItemCount = $items.length;
    lastItemCount = initialItemCount;
    cy.log(`초기 항목 수: ${initialItemCount}`);
  });
  
  // 최대 특정 횟수만큼 스크롤 시도
  function scrollAndCheck() {
    if (scrollAttempts >= maxScrollAttempts) {
      cy.log('최대 스크롤 시도 횟수에 도달했습니다.');
      return;
    }
    
    scrollAttempts++;
    cy.log(`스크롤 시도 #${scrollAttempts}`);
    
    // 페이지 끝으로 스크롤
    cy.scrollTo('bottom');
    
    // 잠시 대기 (API 요청 및 렌더링 시간 고려)
    cy.wait(2000);
    
    // 현재 항목 수 확인
    cy.get('.thumbnail-list li').then(($items) => {
      const currentCount = $items.length;
      cy.log(`현재 항목 수: ${currentCount}`);
      
      if (currentCount > lastItemCount) {
        // 새 항목이 추가됨 - 마지막 카운트 업데이트하고 다시 스크롤
        cy.log('새 항목이 로드되었습니다. 다시 스크롤합니다.');
        lastItemCount = currentCount;
        scrollAndCheck();
      } else {
        // 항목 수가 변하지 않음 - 더 이상 결과가 로드되지 않음
        cy.log('더 이상 새 항목이 로드되지 않습니다. 테스트 완료.');
        
        // 첫 스크롤 이후 항목이 증가했는지 검증 (최소한 한번은 로드되었는지)
        expect(lastItemCount).to.be.greaterThan(initialItemCount);
      }
    });
  }
  
  // 스크롤 테스트 시작
  scrollAndCheck();
});
  });

  describe('검색 결과 없음', () => {
    it('사용자가 키워드(영화가 존재하지 않는)를 검색하면 검색결과가 없다는 페이지가 렌더링 된다.', () => {
      cy.get('.search-bar-input').type('네ㅔㄱㅇ');
      cy.get('.search-bar-button').click();
      
      cy.wait('@getNoResults', { timeout: 10000 });
      
      cy.get('.no-results').should('be.visible');
      cy.get('.no-results').should('contain', '검색 결과가 없습니다');
    });
  });
});