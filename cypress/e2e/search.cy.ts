describe("검색 시나리오 테스트", () => {
  const mockMovieResponse = (
    count: number,
    titlePrefix: string,
    page: number,
    totalPages: number,
  ) => ({
    results: Array.from({ length: count }, (_, i) => ({
      id: 2000 + i + (page - 1) * 20,
      title: `${titlePrefix} ${i + 1 + (page - 1) * 20}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 7.5,
    })),
    page,
    total_pages: totalPages,
  });

  const searchMovie = (inputString: string) => {
    cy.get(".search-input").clear().type(inputString);
    cy.get(".search").submit();
  };

  const scrollToBottom = () => {
    cy.scrollTo("bottom");
    cy.wait(300);
  };

  beforeEach(() => {
    cy.intercept(
      "GET",
      "**/movie/popular?*page=1*",
      mockMovieResponse(20, "인기 영화", 1, 5),
    ).as("getPopular");

    cy.intercept("GET", "**/search/movie?*query=notfound*", {
      results: [],
      page: 1,
      total_pages: 0,
    }).as("searchEmpty");

    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=1*",
      (req) => {
        req.reply({
          delay: 300,
          body: mockMovieResponse(20, "인사이드", 1, 2),
        });
      },
    ).as("searchInsideP1");

    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=2*",
      mockMovieResponse(10, "인사이드", 2, 2),
    ).as("searchInsideP2");

    cy.visit("http://localhost:5173/");
    cy.wait("@getPopular");
  });

  it('1. "인사이드"를 검색하면 제목에 인사이드가 포함된 영화들이 최대 20개 표시된다.', () => {
    searchMovie("인사이드");

    cy.get(".movie-skeleton").should("have.length.at.least", 1);
    cy.wait("@searchInsideP1");

    cy.get(".movie-skeleton").should("not.exist");
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li").each(($el) => {
      cy.wrap($el).find("strong").should("contain.text", "인사이드");
    });
  });

  it("2. 스크롤을 내리면 무한 스크롤 방식으로 영화가 최대 20개씩 추가로 표시된다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");
    cy.get(".thumbnail-list li").should("have.length", 20);

    scrollToBottom();
    cy.wait("@searchInsideP2");

    cy.get(".thumbnail-list li").should("have.length", 30);
  });

  it("3. 더 이상 보여 줄 영화가 없으면 영화를 가져오지 않는다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    scrollToBottom();
    cy.wait("@searchInsideP2");
    cy.get(".thumbnail-list li").should("have.length", 30);

    scrollToBottom();

    cy.get("@searchInsideP2.all").should("have.length", 1);
    cy.get(".thumbnail-list li").should("have.length", 30);
  });

  it("4. 검색 결과가 없으면 `검색 결과가 없습니다.`를 아이콘과 함께 표시된다.", () => {
    searchMovie("notfound");
    cy.wait("@searchEmpty");

    cy.get(".not-search-found-container").should("be.visible");
    cy.get(".not-search-found-img").should("be.visible");
    cy.get(".not-search-found-text").should(
      "contain.text",
      "검색 결과가 없습니다.",
    );
  });

  it("5. 로고를 누르면 메인 화면으로 돌아온다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchInsideP1");

    cy.get(".logo").click();

    cy.get(".background-container").should("be.visible");
    cy.get(".section-title").should("have.text", "지금 인기 있는 영화");
  });
});
