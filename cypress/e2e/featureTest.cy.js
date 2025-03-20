describe("1단계 - 영화 목록 불러오기 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?api_key=*&language=ko-KR&page=1",
      { fixture: "popular_movies_page1.json" }
    ).as("getPopularMoviesPage1");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?api_key=*&language=ko-KR&page=2",
      { fixture: "popular_movies_page2.json" }
    ).as("getPopularMoviesPage2");

    // ✅ 검색 요청 (query=짱구, page=1)
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/search/movie?query=%EC%A7%B1%EA%B5%AC&include_adult=false&language=ko-KR&page=1",
      { fixture: "search_movies_page1.json" }
    ).as("getSearchPage1");

    // ✅ 검색 요청 (query=짱구, page=2 - 더보기)
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/search/movie?query=%EC%A7%B1%EA%B5%AC&include_adult=false&language=ko-KR&page=2",
      { fixture: "search_movies_page2.json" }
    ).as("getSearchPage2");

    cy.intercept("GET", "**/search/movie?*", { fixture: "no_results.json" }).as("getNoResults");

    cy.visit("http://localhost:5173");
    cy.viewport(1024, 768);
  });

  describe("초기 렌더링", () => {
    it("사용자가 처음 화면에 들어왔을때 인기있는 영화 20개가 렌더링 된다.", () => {
      cy.wait("@getPopularMoviesPage1"); // 요청이 완료될 때까지 기다림
      cy.get(".thumbnail-list li").should("have.length", 20);
    });

    it("사용자가 더보기 버튼을 눌렀을때 영화 20개가 추가로 렌더링 된다.", () => {
      cy.wait("@getPopularMoviesPage1");

      cy.get(".thumbnail-list li").should("have.length", 20);
      cy.get(".add-movie").click();

      cy.wait("@getPopularMoviesPage2"); // 더보기 클릭 후 요청이 완료될 때까지 기다림

      cy.get(".thumbnail-list li").should("have.length", 40);
    });
  });

  describe("검색 기능", () => {
    it("사용자가 키워드(영화가 존재하는)를 검색하면 관련 영화가 최대 20개 렌더링 된다.", () => {
      cy.get(".search-bar-input").type("짱구");
      cy.get(".search-bar-button").click();

      cy.wait("@getSearchPage1");

      cy.get(".thumbnail-list li").should("have.length.lte", 20);
    });

    it("사용자가 더보기 버튼을 눌렀을때 영화 최대 20개가 추가로 렌더링 된다.", () => {
      cy.get(".search-bar-input").type("짱구");
      cy.get(".search-bar-button").click();

      cy.wait("@getSearchPage1");

      cy.get(".add-movie").click();
      cy.wait("@getSearchPage2"); // 더보기 클릭 후 요청 대기

      cy.get(".thumbnail-list li").should("have.length.gt", 20);
      cy.get(".thumbnail-list li").should("have.length.lte", 40);
    });

    it("페이지 끝에 도달한 경우 더보기 버튼은 화면에 출력되지 않는다.", () => {
      cy.get(".search-bar-input").type("짱구");
      cy.get(".search-bar-button").click();

      cy.wait("@getSearchPage1");

      function clickUntilButtonGone() {
        cy.get("body").then(($body) => {
          if ($body.find(".add-movie").length > 0) {
            cy.get(".add-movie").click();
            cy.wait("@getSearchPage2");
            clickUntilButtonGone();
          } else {
            cy.get(".add-movie").should("not.exist");
          }
        });
      }

      clickUntilButtonGone();
    });
  });

  describe("검색 결과 없음", () => {
    it("사용자가 키워드(영화가 존재하지 않는)를 검색하면 검색결과가 없다는 페이지가 렌더링 된다.", () => {
      // cy.intercept("GET", "**/search/movie?*", { fixture: "no_results.json" }).as("getNoResults");

      cy.get(".search-bar-input").type("네ㅔㄱㅇ");
      cy.get(".search-bar-button").click();

      cy.wait("@getNoResults");

      cy.contains("검색 결과가 없습니다").should("be.visible");
    });
  });
});
