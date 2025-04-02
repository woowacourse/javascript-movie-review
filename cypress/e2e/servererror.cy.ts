import { ERROR_MESSAGE } from "../../src/setting/ErrorMessage";
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("fallback 테스트", () => {
  it(`서버가 500를 보내면 ${ERROR_MESSAGE.FETCH_ERROR}를 보여준다.`, () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
      }
    );
    cy.visit(localHostUrl);
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });
  it("서버가 500를 보내고 다시 연결되면 제대로된 리스트를 보여줘야 한다.", () => {
    cy.visit(localHostUrl);
    cy.wait(2000);
    // 첫 번째 intercept: 한 번의 호출에 대해 500 에러 반환
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
        times: 1,
      }
    ).as("errorCall");

    // 첫 번째 호출로 인해 에러가 발생하는지 확인
    cy.scrollTo("bottom");
    cy.wait("@errorCall");
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);

    // 정상 응답 intercept 재등록: stub 데이터를 fixture로 설정
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      {
        fixture: "movie-popular.json", // fixture 파일에 정상 응답 데이터를 저장해둡니다.
      }
    ).as("normalCall");

    // 정상 응답이 반환되는지 확인하기 위해 다시 API 호출 트리거
    cy.scrollTo("bottom");
    // cy.wait("@normalCall");
    cy.get("#load-more").should("be.visible").click();
    cy.get("#thumbnail-list > li").should("have.length", 40);
  });

  it(`아이템을 클릭했을때 서버가 500를 보내면 ${ERROR_MESSAGE.FETCH_ERROR}를 보여준다.`, () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      { fixture: "movie-popular.json" }
    );
    cy.intercept(
      {
        method: "GET",
        url: /\/3\/movie\/\d+/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
      }
    ).as("getMovieDetail");
    cy.visit(localHostUrl);
    cy.get("#696506").click();
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });

  it("검색을 했는데 서버가 500를 보내고 다시 연결되면 제대로된 리스트를 보여줘야 한다.", () => {
    cy.visit(localHostUrl);
    cy.wait(2000);

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      (req) => {
        if (req.query.page === "1" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search1.json" });
        } else if (req.query.page === "2" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search2.json" });
        }
      }
    ).as("initialSearch");

    const searchValue = "짱구";
    cy.get(".search-bar").type(searchValue + "{enter}");
    cy.wait("@initialSearch");

    cy.get("#thumbnail-list > li")
      .should("exist")
      .each(($li) => {
        cy.wrap($li).should("contain.text", searchValue);
      });

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
        times: 1,
      }
    ).as("errorCall");

    cy.scrollTo("bottom");
    cy.wait("@errorCall");

    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      (req) => {
        if (req.query.query === "짱구") {
          if (req.query.page === "2") {
            req.reply({ fixture: "jjanggu-search2.json" });
          }
        }
      }
    ).as("recoveryCall");

    cy.scrollTo("bottom");
    // cy.wait("@recoveryCall");
    //왜?????
    cy.get("#load-more").should("be.visible").click();
    cy.get("#thumbnail-list > li").should("have.length", 35);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", searchValue);
    });
  });
});
