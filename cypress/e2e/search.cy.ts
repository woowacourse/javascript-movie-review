describe("검색 데이터 있을 때 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.intercept("GET", "**/search/movie*", {
      statusCode: 200,
      body: {
        page: 1,
        results: [
          {
            id: 101,
            title: "해리 포터와 마법사의 돌",
            poster_path: "/harry1.jpg",
            vote_average: 7.8,
          },
          {
            id: 102,
            title: "해리 포터와 비밀의 방",
            poster_path: "/harry2.jpg",
            vote_average: 7.6,
          },
          {
            id: 103,
            title: "해리 포터와 아즈카반의 죄수",
            poster_path: "/harry3.jpg",
            vote_average: 8.0,
          },
        ],
        total_pages: 1,
        total_results: 3,
      },
    }).as("searchMovies");

    cy.visit("http://localhost:5173");

    cy.get(".search-input").type("해리포터");
    cy.get(".search-button").click();
  });

  it("검색 버튼을 클릭하면 검색 결과가 렌더된다.", () => {
    cy.wait("@searchMovies");
    cy.get(".thumbnail-item").should("have.length", 3);
  });

  it("검색한 입력값이 제목에 보인다.", () => {
    cy.wait("@searchMovies");
    cy.get(".thumbnail-title").should("contain", "해리포터");
  });

  it("영화 카드 클릭 시 모달이 열린다.", () => {
    cy.wait("@searchMovies");

    cy.get(".item").first().click();
    cy.get(".modal").should("be.visible");
  });
});

describe("검색 데이터 없을 때 테스트", () => {
  it("검색 데이터가 없으면 '검색 결과가 없습니다.'라는 문구를 띄운다.", () => {
    cy.intercept("GET", "**/search/movie*", {
      statusCode: 200,
      body: {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    }).as("emptySearchMovies");

    cy.visit("http://localhost:5173");

    cy.get(".search-input").type("asdfdas");
    cy.get(".search-button").click();

    cy.get(".empty-message")
      .should("exist")
      .and("contain", "검색 결과가 없습니다.");
  });
});
