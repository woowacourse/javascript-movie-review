describe("인기 영화 목록 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });

  it("초기 접속 시에 화면에 인기 영화 목록이 출력된다.", () => {
    cy.get("movie-list").find("movie-item").should("exist");
  });

  it("헤더 로고 클릭시에 초기 인기 영화 목록이 출력된다.", () => {
    cy.get("img[data-action='popular']").click();

    cy.get("movie-list").find("movie-item").should("exist");
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
