describe("인기 영화 목록 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });

  it("초기 접속 시에 화면에 인기 영화 목록이 출력된다.", () => {
    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").children().should("have.length", 20);
  });

  it("헤더 로고 클릭시에 초기 인기 영화 목록이 출력된다.", () => {
    cy.get("img[data-action='popular']").click();

    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").should("exist");
  });
});

describe("인기 영화 더보기 확인", () => {
  it("끝 페이지에 도달했을 때, 더보기 버튼이 없어진다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.wait("@getPopularMovies").then(() => {
      cy.get("button[data-action='more_popular']").should("not.be.visible");
    });
  });
  it("인기 영화 페이지에서 더보기 클릭시 영화 목록이 추가된다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get("button[data-action='more_popular']").click();

    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").should("have.length", 2);
  });
});

describe("검색 목록 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });

  it("해리포터를 입력하고 검색버튼을 눌렀을 때 해리포터에 대한 검색 결과가 나온다.", () => {
    cy.get(".search-box").find("input").type("해리포터");
    cy.get("button[data-action='search']")
      .click()
      .then(() => {
        cy.get(".item-title").each(() => {
          cy.get("p.item-title").contains(/해\s*리\s*포\s*터/);
        });
      });
  });

  it("해리포터를 입력하고 엔터키를 입력했을 때 해리포터에 대한 검색 결과가 나온다.", () => {
    cy.get(".search-box")
      .find("input")
      .type("해리포터{enter}")
      .then(() => {
        cy.get(".item-title").each(() => {
          cy.get("p.item-title").contains(/해\s*리\s*포\s*터/);
        });
      });
  });

  it("검색했을 때, 검색결과가 존재하지 않을 시 검색결과 없음 페이지가 뜬다.", () => {
    cy.get(".search-box")
      .find("input")
      .type("sdmnfbikrdnfivjdnfodmfhfidff{enter}")
      .then(() => {
        cy.get(".no-result-title").contains("검색 결과를 찾지 못하였습니다.");
      });
  });
});

describe("검색목록 더보기 확인", () => {
  it("검색결과 페이지에서 더보기 버튼 클릭시 검색목록이 추가된다. ", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get(".search-box")
      .find("input")
      .type("전쟁{enter}")
      .then(() => {
        cy.get("button[data-action='more_search']").click();

        cy.get("movie-list-page").find("movie-item").should("exist");
        cy.get("movie-list-page").should("have.length", 2);
      })
      .then(() => {
        cy.get(".item-title").each(() => {
          cy.get("p.item-title").contains(/전\s*쟁/);
        });
      });
  });
});

describe("네트워크 에러 확인", () => {
  it("네트워크 오류시 에러 화면이 뜬다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 401 }
    ).as("getErrorData");

    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.wait("@getErrorData").then(() => {
      cy.get(".error-title").contains("오류");
    });
  });
});
