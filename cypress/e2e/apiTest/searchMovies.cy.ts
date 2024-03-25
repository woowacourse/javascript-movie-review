describe("[API 테스트]사용자가 보고 싶은 영화를 검색하면, 검색어를 포함한 영화 목록을 보여준다.", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");

    cy.get("form.search-box>input").as("searchInput");
  });

  it("사용자가 검색창에 검색어를 입력하고 엔터를 누르면 영화를 검색할 수 있다.", () => {
    cy.get("@searchInput").type("해리포터").type("{enter}");

    const searchHarryPotterUrl =
      "https://api.themoviedb.org/3/search/movie?" +
      new URLSearchParams({
        query: "해리포터",
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "1",
      });

    cy.request("GET", searchHarryPotterUrl).as("searchHarryPotter");

    cy.get("@searchHarryPotter").its("status").should("eq", 200);
    cy.get("@searchHarryPotter").its("body.results").should("have.length", 8);

    cy.get("ul.item-list").children().should("have.length", 8);
  });

  it("사용자가 검색창에 검색어를 입력하고 검색 버튼(돋보기)을 누르면 영화를 검색할 수 있다.", () => {
    cy.get("@searchInput").type("해리포터");
    cy.get("@searchInput").next().click();

    const searchHarryPotterUrl =
      "https://api.themoviedb.org/3/search/movie?" +
      new URLSearchParams({
        query: "해리포터",
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "1",
      });

    cy.request("GET", searchHarryPotterUrl).as("searchHarryPotter");

    cy.get("@searchHarryPotter").its("status").should("eq", 200);
    cy.get("@searchHarryPotter").its("body.results").should("have.length", 8);

    cy.get("ul.item-list").children().should("have.length", 8);
  });
});
