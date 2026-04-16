import { interceptPopularError, interceptPopularLastPage, interceptPopularPage1, interceptPopularPage2, interceptSearchError, interceptSearchLastPage, interceptSearchPage1, interceptSearchPage2 } from "./spec";

describe("메인 무한 스크롤 동작 테스트", () => {
  it("스크롤이 observer target에 도달하면 추가 영화가 append된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    cy.get("#popular-thumbnail-list li").then(($initialItems) => {
      const initialCount = $initialItems.length;

      interceptPopularPage2();
      cy.get("#home-observer-target").scrollIntoView();
      cy.wait("@getPopularPage2");

      cy.get("#popular-thumbnail-list li").should(
        "have.length.greaterThan",
        initialCount,
      );
    });
  });

  it("마지막 페이지인 경우 observer target이 렌더링되지 않는다", () => {
    interceptPopularLastPage();
    cy.visit("/");
    cy.wait("@getPopularLastPage");

    cy.get("#home-observer-target").should("not.exist");
  });
});

describe("검색 무한 스크롤 동작 테스트", () => {
  it("검색 후 스크롤이 observer target에 도달하면 추가 결과가 append된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get("#search-thumbnail-list li").then(($initialItems) => {
      const initialCount = $initialItems.length;

      interceptSearchPage2();
      cy.get("#search-observer-target").scrollIntoView();
      cy.wait("@getSearchPage2");

      cy.get("#search-thumbnail-list li").should(
        "have.length.greaterThan",
        initialCount,
      );
    });
  });

  it("검색 결과가 마지막 페이지인 경우 observer target이 렌더링되지 않는다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchLastPage();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchLastPage");

    cy.get("#search-observer-target").should("not.exist");
  });
});

describe("홈 무한 스크롤 에러 테스트", () => {
  it("스크롤로 추가 로딩 중 에러가 발생하면 에러 메시지가 alert된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptPopularError();
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#home-observer-target").scrollIntoView();
    cy.wait("@getPopularError").then(() => {
      expect(alertStub).to.have.been.called;
    });
  });
});

describe("검색 무한 스크롤 에러 테스트", () => {
  it("검색 후 스크롤로 추가 로딩 중 에러가 발생하면 에러 메시지가 alert된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    interceptSearchError();
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#search-observer-target").scrollIntoView();
    cy.wait("@getSearchError").then(() => {
      expect(alertStub).to.have.been.called;
    });
  });
});
