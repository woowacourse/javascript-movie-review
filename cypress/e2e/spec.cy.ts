describe("첫 화면에 위치한 elements 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("첫 화면이 로드되면 20개의 데이터가 존재한다.", () => {
    cy.get(".item-card").should("have.length", 20);
  });

  it("데이터 20개가 있고, 더보기버튼을 눌렀을 때 데이터의 개수는 40개가 된다.", () => {
    cy.get(".item-card").should("have.length", 20);
    cy.get(".primary").click();
    cy.get(".item-card").should("have.length", 40);
  });

  it("Porter라는 키워드를 입력했을 때 해당 데이터 20개가 보여진다.t", () => {
    cy.get(".search-input").type("porter");
    cy.get(".search-input").trigger("keyup", { keyCode: 13 });
    cy.get(".item-card").should("have.length", 20);
  });
});

describe("api 통신 테스트", () => {
  it("popular movie를 불러오는 함수를 실행하면 해당 경로의 데이터가 20개씩 불러와진다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getMovieData");

    cy.visit("http://localhost:8080/");

    cy.wait("@getMovieData").then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it("search movie를 불러오는 함수를 실행하면 해당 데이터가 20개 불러와진다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getMovieData");

    cy.visit("http://localhost:8080/");

    cy.wait("@getMovieData").then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });
});
