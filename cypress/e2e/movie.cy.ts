describe('영화 리뷰 step2 테스트', () => {
  beforeEach(() => {
    // 인기 영화 목록 API 가로채기
    cy.intercept('GET', '**/movie/popular*', {
      fixture: 'popularMovies.json', 
    }).as('getPopularMovies');

    // 영화 상세 정보 API를 가로채기
    cy.intercept('GET', /\/movie\/\d+/, {
      fixture: 'movieDetail.json', 
    }).as('getMovieDetail');

    cy.visit('/');
    
    cy.wait('@getPopularMovies'); 
  });

  describe('무한 스크롤 동작 테스트', () => {
    it('화면을 끝까지 스크롤하면 새로운 영화 목록이 추가로 로드된다.', () => {
      // 렌더링된 영화 아이템 개수 저장
      cy.get('.thumbnail-list .movie-item').then(($items) => {
        const initialCount = $items.length;

        // 바닥으로 스크롤하여 더 보기 트리거
        cy.scrollTo('bottom');
        
        // 렌더링 대기
        cy.wait('@getPopularMovies');

        // 영화 아이템 개수가 늘어났는지 검증
        cy.get('.thumbnail-list .movie-item')
          .should('have.length.greaterThan', initialCount);
      });
    });
  });

  describe('상세 정보 모달 여닫기 테스트', () => {
    // 클릭 확인
    it('영화 클릭 시 모달이 열리고, 닫기 버튼을 누르면 모달이 닫힌다.', () => {
      // 첫 번째 영화 아이템 클릭
      cy.get('.thumbnail-list .movie-item').first().click();

      // 모달 데이터 응답 대기
      cy.wait('@getMovieDetail');

      // 모달이 활성화되었는지 확인 (active 클래스 및 화면노출)
      cy.get('#modalBackground').should('have.class', 'active');
      cy.get('#modalContainer').should('be.visible');

      // 닫기 버튼 클릭
      cy.get('#closeModal').click();

      // 모달이 정상적으로 닫혔는지 확인
      cy.get('#modalBackground').should('not.have.class', 'active');
    });

    // 배경클릭 확인
    it('모달 배경을 클릭해도 모달이 닫힌다.', () => {
      cy.get('.thumbnail-list .movie-item').first().click();
      
      // 배경 영역 클릭
      cy.get('#modalBackground').click('topLeft', { force: true }); 

      cy.get('#modalBackground').should('not.have.class', 'active');
    });

    // ESC키 확인
    it('ESC 키를 누르면 모달이 닫힌다.', () => {
      cy.get('.thumbnail-list .movie-item').first().click();
      cy.get('#modalBackground').should('have.class', 'active');

      // body 태그에 대고 ESC 키 입력 이벤트 발생
      cy.get('body').type('{esc}');

      // 모달이 정상적으로 닫혔는지 확인
      cy.get('#modalBackground').should('not.have.class', 'active');
    });
  });

  describe('별점 평가 및 데이터 유지 테스트', () => {
    it('별점을 선택하면 반영되고, 새로고침 후에도 해당 점수가 유지된다.', () => {
      const TARGET_SCORE = 8;
      const RATING_TEXT = '재미있어요';

      // 모달 열기
      cy.get('.thumbnail-list .movie-item').first().click();

      // 8점 클릭
      cy.get(`.rate-star-img[data-score="${TARGET_SCORE}"]`).click();

      // UI에 평가 문구와 점수가 반영되었는지 확인
      cy.get('#ratingDescription')
        .should('contain.text', RATING_TEXT)
        .and('contain.text', `(${TARGET_SCORE}/10)`);

      // 모달 닫기
      cy.get('#closeModal').click();

      // 페이지 새로고침
      cy.reload();
      cy.wait('@getPopularMovies');

      // 동일한 영화의 모달을 다시 열기
      cy.get('.thumbnail-list .movie-item').first().click();

      // LocalStorage에서 데이터를 잘 가져와서 이전 점수가 그대로 표시되는지 확인
      cy.get('#ratingDescription')
        .should('contain.text', RATING_TEXT)
        .and('contain.text', `(${TARGET_SCORE}/10)`);
        
      // 별 이미지 소스도 채워진 별(star_filled)인지 확인 (첫 번째 별점 예시)
      cy.get(`.rate-star-img[data-score="2"]`)
        .should('have.attr', 'src')
        .and('include', 'star_filled');
    });
  });

  describe('예외 상황 테스트', () => {
    it('상세 정보 API 호출이 실패하면 다시 시도 버튼을 보여준다.', () => {
      // 500 상태 반환
      cy.intercept('GET', /\/movie\/\d+/, {
        statusCode: 500,
        body: 'Internal Server Error'
      }).as('getMovieDetailError');

      // 첫 번째 영화 클릭
      cy.get('.thumbnail-list .movie-item').first().click();
      cy.wait('@getMovieDetailError');

      // 에러 화면과 다시 시도 버튼이 잘 뜨는지 검증
      cy.get('#modalContainer').should('contain.text', '에러');
      cy.get('#retryModalButton').should('be.visible');
    });

    it('localStorage의 값이 깨져있을 경우 기본 상태 렌더링', () => {
      // 로컬 스토리지에 파싱 불가능한 텍스트
      cy.window().then((win) => {
        win.localStorage.setItem('movie_ID_stars', '이건 절대 JSON으로 파싱할 수 없는 텍스트입니다!');
      });

      // API는 정상적으로 동작
      cy.intercept('GET', /\/movie\/\d+/, { fixture: 'movieDetail.json' }).as('getMovieDetail');

      // 첫 번째 영화 클릭
      cy.get('.thumbnail-list .movie-item').first().click();
      cy.wait('@getMovieDetail');

      // 기본 상태인 평가해주세요가 뜨는지 검증
      cy.get('#modalBackground').should('have.class', 'active');
      cy.get('#ratingDescription').should('contain.text', '평가해주세요');
    });
  });
});