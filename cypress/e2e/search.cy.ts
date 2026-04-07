describe("검색 시나리오 테스트", () => {
  // TMDB API의 실제 응답 형식을 모사하는 헬퍼 함수
  const mockMovieResponse = (
    count: number,
    titlePrefix: string,
    page: number,
    totalPages: number,
  ) => ({
    results: Array.from({ length: count }, (_, i) => ({
      id: i + (page - 1) * 20,
      title: `${titlePrefix} ${i + 1}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 7.5,
    })),
    page: page,
    total_pages: totalPages,
  });

  beforeEach(() => {
    // 1. 초기 진입 시 인기 영화 모킹 (메인 화면 로딩 방해 방지)
    cy.intercept(
      "GET",
      "**/movie/popular*",
      mockMovieResponse(20, "인기 영화", 1, 5),
    );

    // 2. "인사이드" 검색 - 1페이지 (20개, 총 2페이지 있음)
    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=1*",
      mockMovieResponse(20, "인사이드", 1, 2),
    ).as("searchInsideP1");

    // 3. "인사이드" 검색 - 2페이지 (마지막 페이지, 10개만 더 불러옴)
    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=2*",
      mockMovieResponse(10, "인사이드", 2, 2),
    ).as("searchInsideP2");

    // 4. 결과가 없는 검색어 모킹
    cy.intercept("GET", "**/search/movie?*query=notfound*", {
      results: [],
      page: 1,
      total_pages: 0,
    }).as("searchEmpty");

    cy.visit("http://localhost:5173/");
  });

  // 검색 액션을 수행하는 공통 함수
  const searchMovie = (inputString: string) => {
    cy.get(".search-input").type(inputString);
    cy.get(".search").submit();
  };

  it('1. "인사이드"를 검색하면 제목에 "인사이드"가 포함된 영화 아이템이 표시된다.', () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li").each(($el) => {
      // 각 리스트 아이템의 제목이 "인사이드"를 포함하는지 확인
      cy.wrap($el).find("strong").should("contain.text", "인사이드");
    });
  });

  it("2. 더 보기 버튼을 누르면 영화 아이템이 최대 20개 추가로 로드된다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    cy.get(".more-button").click();
    cy.wait("@searchInsideP2");

    // 첫 페이지 20개 + 두 번째 페이지 10개 = 총 30개
    cy.get(".thumbnail-list li").should("have.length", 30);
  });

  it("3. 더 이상 보여줄 영화가 없으면 더 보기 버튼이 사라진다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    cy.get(".more-button").click(); // 2페이지(마지막) 요청
    cy.wait("@searchInsideP2");

    // 소스코드 로직: nowPage(2) === totalPages(2) 일 때 display: none
    cy.get(".more-button").should("not.be.visible");
  });

  it("4. 검색 결과가 없으면 `검색 결과가 없습니다.`를 아이콘과 함께 표시된다.", () => {
    searchMovie("notfound");
    cy.wait("@searchEmpty");

    cy.get(".not-search-found-container").should("be.visible");
    cy.get(".not-search-found-text").should(
      "contain.text",
      "검색 결과가 없습니다.",
    );
    // 아이콘(이미지)이 존재하는지도 확인
    cy.get(".not-search-found-img").should("be.visible");
  });

  it("5. 로고를 누르면 메인 화면으로 돌아온다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    // 검색 결과 화면에서 로고 클릭
    cy.get(".logo").click();

    // location.reload()가 호출되므로 메인 화면의 background-container가 다시 보여야 함
    cy.get(".background-container").should("be.visible");
    // 섹션 타이틀이 다시 인기 영화 등으로 초기화되었는지 확인 (필요 시)
    cy.get(".section-title").should("not.contain", "검색 결과");
  });
});
