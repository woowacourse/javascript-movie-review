describe("인기영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("웹에 접근을 하면 인기 영화 20개를 랜더링 한다", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("인기 영화 화면에서 더보기 버튼을 누르면 인기 영화 20개를 추가로 렌더링 한다", () => {
    cy.get("#load-movie-button").click();
    cy.get(".thumbnail-list li").should("have.length", 40);
  });
});

describe("인기 영화 더보기 버튼이 숨겨지는지 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
      { fixture: "movies2.json" },
    ).as("getMoviesPage2");

    cy.visit("http://localhost:5173");
  });

  it("마지막 페이지 도달 시 더보기 버튼이 사라진다", () => {
    cy.wait("@getMovies");
    cy.get("#load-movie-button").click();
    cy.wait("@getMoviesPage2");
    cy.get("#load-movie-button").should("have.css", "display", "none");
  });
});

describe("검색영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("Harry Potter를 검색 하면 검색에 따른 영화를 랜더링 한다.", () => {
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.get(".thumbnail-list li").should("have.length.at.least", 1);
  });

  it("뷁뷁뷁을 검색 하면 검색 결과가 없어야 한다.", () => {
    cy.get(".search-input").type("뷁뷁뷁");
    cy.press("Enter");
    cy.get(".thumbnail-list li").should("have.length", 0);
    cy.get("#no-result").contains("검색 결과가 없습니다.").should("exist");
  });
});

describe("검색 영화 더보기 버튼이 숨겨지는지 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search/movie*page=1*", {
      fixture: "movies.json",
    }).as("getMovies");

    cy.intercept("GET", "**/search/movie*page=2*", {
      fixture: "movies2.json",
    }).as("getMoviesPage2");

    cy.visit("http://localhost:5173");
  });

  it("마지막 페이지 도달 시 더보기 버튼이 사라진다", () => {
    cy.get(".search-input").type("영화");
    cy.get(".search-input").type("{enter}");
    cy.wait("@getMovies");
    cy.get("#load-movie-button").click();
    cy.wait("@getMoviesPage2");
    cy.get("#load-movie-button").should("have.css", "display", "none");
  });
});

describe("Skeleton UI 테스트", () => {
  it("이미지 로드 전 스켈레톤 UI가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", (req) => {
      req.on("response", (res) => {
        res.setDelay(10000);
      });
    }).as("getImage");

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".item").should("have.class", "skeleton");
        cy.get(".skeleton-poster").should("exist");
        cy.get(".skeleton-rate").should("exist");
        cy.get(".skeleton-title").should("exist");
      });
  });

  it("이미지 로드 실패 시 스켈레톤 UI가 제거되고 대체 이미지가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", {
      statusCode: 404,
    }).as("getImageFailed");

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.wait("@getImageFailed");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".thumbnail")
          .should("have.attr", "src")
          .and("include", "no_image.png");
        cy.get(".item").should("not.have.class", "skeleton");
        cy.get(".skeleton-poster").should("not.exist");
        cy.get(".skeleton-rate").should("not.exist");
        cy.get(".skeleton-title").should("not.exist");
      });
  });
});
