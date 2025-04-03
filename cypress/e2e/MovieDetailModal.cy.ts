/// <reference types="cypress" />

describe("영화 상세 모달 E2E 테스트", () => {
  const movieId = 822119;

  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: new RegExp(`https://api\\.themoviedb\\.org/3/movie/${movieId}`),
      },
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    cy.visit("localhost:5173");

    // DOM에 해당 영화 아이템을 미리 추가
    cy.document().then((doc) => {
      let container = doc.querySelector(".thumbnail-list");
      if (!container) {
        container = doc.createElement("ul");
        container.className = "thumbnail-list";
        doc.body.appendChild(container);
      }
      // 기존에 같은 movieId 아이템이 있다면 제거하고 추가
      const existingItem = container.querySelector(
        `.item[data-id="${movieId}"]`
      );
      if (existingItem) {
        existingItem.remove();
      }
      const item = doc.createElement("div");
      item.className = "item";
      item.setAttribute("data-id", movieId.toString());
      container.appendChild(item);
    });
  });

  it("모달이 정상적으로 열리고 영화 상세 정보가 표시되어야 한다", () => {
    cy.get(`.item[data-id="${movieId}"]`).click();
    cy.wait("@getMovieDetail");
    cy.get("dialog#modalBackground").should("be.visible");
    cy.fixture("movie-detail.json").then((movie) => {
      cy.get(".modal-description h2").should("have.text", movie.title);
      cy.get(".modal-description .category").should(
        "contain.text",
        movie.genres[0].name
      );
      cy.get(".modal-description .detail p").should(
        "contain.text",
        movie.overview
      );
    });
  });

  it("닫기 버튼을 클릭하면 모달이 닫혀야 한다", () => {
    cy.get(`.item[data-id="${movieId}"]`).click();
    cy.wait("@getMovieDetail");
    cy.get("dialog#modalBackground").should("be.visible");
    cy.get("#closeModal").click();
    cy.get("dialog#modalBackground").should("not.exist");
    cy.get("body").should("not.have.class", "modal-open");
  });

  it("백드롭(모달 외부)을 클릭하면 모달이 닫혀야 한다", () => {
    cy.get(`.item[data-id="${movieId}"]`).click();
    cy.wait("@getMovieDetail");
    cy.get("dialog#modalBackground").should("be.visible");
    cy.get("dialog#modalBackground").click("topLeft");
    cy.get("dialog#modalBackground").should("not.exist");
    cy.get("body").should("not.have.class", "modal-open");
  });

  it("ESC 키를 누르면 모달이 닫혀야 한다", () => {
    cy.get(`.item[data-id="${movieId}"]`).click();
    cy.wait("@getMovieDetail");
    cy.get("dialog#modalBackground").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get("dialog#modalBackground").should("not.exist");
    cy.get("body").should("not.have.class", "modal-open");
  });

  it("네트워크 오류 발생 시 에러 메시지가 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: new RegExp(`https://api\\.themoviedb\\.org/3/movie/${movieId}`),
      },
      { forceNetworkError: true }
    ).as("networkError");

    cy.get(`.item[data-id="${movieId}"]`).click();
    cy.wait("@networkError");
    cy.get(".modal-error").should(
      "contain.text",
      "상세 정보를 불러오는 데 실패했습니다"
    );
  });
});
