describe("인기 영화 목록 페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });

  it("초기 접속 시에 인기 영화목록 상위 20개가 화면에 출력된다.", () => {
    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").children().should("have.length", 20);
  });

  it("헤더 로고 클릭 시 처음 인기 영화목록이 출력된다.", () => {
    cy.get("img[data-action='popular']").click();

    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").should("exist");
  });
});

describe("인기 영화 목록 더보기", () => {
  it("사용자가 마지막 페이지에 도달했을 때, 더보기 버튼이 화면에서 보이지 않아야 한다.", () => {
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
  it("인기 영화 페이지에서 더보기 버튼 클릭시 영화 목록이 추가된다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get("button[data-action='more_popular']").click();

    cy.get("movie-list-page").find("movie-item").should("exist");
    cy.get("movie-list-page").should("have.length", 2);
  });
});

describe("검색 목록 확인", () => {
  it("검색창에 해리포터를 입력하고 검색버튼 클릭시, 제목에 '해리포터'가 포함된 영화 목록이 화면에 나온다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get(".search-box").find("input").type("해리포터");
    cy.get("button[data-action='search']")
      .click()
      .then(() => {
        cy.get(".item-title").each(() => {
          cy.get("h3.item-title").contains(/해\s*리\s*포\s*터/);
        });
      });
  });

  it("검색창에 해리포터를 입력하고 엔터키를 누르면, 제목에 '해리포터'가 포함된 영화 목록이 화면에 나타난다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get(".search-box")
      .find("input")
      .type("해리포터{enter}")
      .then(() => {
        cy.get(".item-title").each(() => {
          cy.get("h3.item-title").contains(/해\s*리\s*포\s*터/);
        });
      });
  });

  it("검색창에 검색결과가 없는 검색어를 입력한 후 검색하는데, 결과가 존재하지 않을 시 검색결과 없음 페이지가 화면에 나타난다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    cy.get(".search-box")
      .find("input")
      .type("sdmnfbikrdnfivjdnfodmfhfidff{enter}")
      .then(() => {
        cy.get(".no-result-title").contains("검색 결과를 찾지 못하였습니다.");
      });
  });

  it("검색창에 입력을 하지 않고 엔터키를 누르면 사용자에게 검색어가 없다는 경고창이 화면에 나온다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get(".search-box")
      .find("input")
      .type("{enter}")
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("검색어를 입력해주세요.");
      });
  });

  it("검색창에 입력을 하지 않고 검색버튼을 클릭하면 사용자에게 검색어가 없다는 경고창이 화면에 나온다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get(".search-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("검색어를 입력해주세요.");
      });
  });

  it("검색창에 공백만을 입력하고 검색버튼을 클릭하면 사용자에게 검색어가 없다는 경고창이 화면에 나온다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".search-box").find("input").type("     ");
    cy.get(".search-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("검색어를 입력해주세요.");
      });
  });

  it("검색창에 공백만을 입력하고 엔터키를 누르면 사용자에게 검색어가 없다는 경고창이 화면에 나온다.", () => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);

    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".search-box")
      .find("input")
      .type("     {enter}")
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("검색어를 입력해주세요.");
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
        cy.get("h3.item-title").each(() => {
          cy.get("h3.item-title").contains(/전\s*쟁/);
        });
      });
  });
});

describe("네트워크 에러 확인", () => {
  it("네트워크 접속 오류 시 에러 페이지가 화면에 나타난다.", () => {
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
