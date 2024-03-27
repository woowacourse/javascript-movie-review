describe("영화 검색 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");

    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/search/movie?*",
      },
      {
        fixture: "searchedMovies.json",
      }
    );
  });

  const searchQuery = "쿵푸";

  it("검색어가 500자를 초과할 시 500자 이후의 글자는 생략된다.", () => {
    const longSearchQuery = "a".repeat(501);
    const trimmedSearchQuery = "a".repeat(500);

    cy.get("#search-input").type(longSearchQuery);
    cy.get("#search-input").should("have.value", trimmedSearchQuery);
  });

  it("영화 검색 시 검색 결과 타이틀에 검색어가 포함된다.", () => {
    cy.get("#search-input").type(searchQuery);
    cy.get("#search-form button").click();
    cy.get("#movie-list-title").contains(searchQuery).should("exist");
  });

  it("입력한 검색어를 포함한 결과가 있으면 화면에 출력한다.", () => {
    cy.get("#search-input").type(searchQuery);
    cy.get("#search-form button").click();
    cy.get("li").should("have.length", 20);
  });

  it("영화 검색 후 로고를 클릭하면 입력된 검색어가 초기화 되고, 초기 화면을 렌더링한다.", () => {
    cy.get("#search-input").type(searchQuery);
    cy.get("#search-form button").click();
    cy.get("#movie-list-title")
      .contains(`"${searchQuery}" 검색 결과`)
      .should("exist");

    cy.get("#movie-list-logo").click();

    cy.get("#movie-list-title").contains("인기 있는 영화").should("exist");
    cy.get("li").should("have.length", 20);
  });
});
