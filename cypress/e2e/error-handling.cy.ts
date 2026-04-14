import { moviesFixture } from "../../test/fixtures";
import { mockPopularPage } from "../support/movie";

describe("오류 대응 테스트", () => {
  beforeEach(() => {
    mockPopularPage({
      page: 1,
      results: moviesFixture,
      totalPages: 2,
      totalResults: 40,
    });

    cy.intercept("GET", "**/movie/popular?page=2&language=ko-KR", {
      statusCode: 400,
      body: {
        success: false,
        status_code: 22,
        status_message:
          "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.",
      },
    }).as("getInvalidPopularPage");

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
  });

  it("검색어가 입력되지 않을 경우 검색버튼을 눌러도 검색 기능을 수행하지 않고 입력 부분을 다시 포커싱한다.", () => {
    cy.get("#search-button").click();

    cy.focused().should("have.id", "search-input");
  });

  it("정상적인 페이지 범위를 벗어난 페이지를 요청했을 때 alert 경고 메시지가 뜬다.", () => {
    const alertSpy = cy.stub();
    cy.on("window:alert", alertSpy);

    cy.get(".scroll-sentinel").scrollIntoView();
    cy.wait("@getInvalidPopularPage");
    cy.wrap(alertSpy).should("have.been.called");
  });
});
