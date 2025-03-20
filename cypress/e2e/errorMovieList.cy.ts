import { createIntercept } from "../utils/createIntercept";

describe("API 에러가 발생한 경우 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: {
        statusCode: 500,
        body: {
          status_code: 7,
          status_message: "Invalid API key: You must be granted a valid key.",
          success: false,
        },
      },
    });

    createIntercept({
      id: "getSearchMovieList",
      url: "^https://api.themoviedb.org/3/search/movie*",
      delay: 1000,
      staticResponse: {
        statusCode: 501,
        body: {
          status_code: 2,
          status_message: "Invalid service: this service does not exist.",
          success: false,
        },
      },
    });

    cy.visit("http://localhost:5173/");
  });

  it("API 에러가 발생한 경우 response으로 내려온 에러 메세지를 ErrorBox 컴포넌트와 함께 렌더링한다.", () => {
    expect(cy.get(".skeleton-list").should("exist"));

    // statusCode 응답 값 확인
    cy.wait("@getPopularMovieList").then((interception) => {
      const statusCode = interception.response?.statusCode;
      expect(statusCode).to.equal(500);

      expect(cy.get(".error-box").should("exist"));

      const statusMessage = interception.response?.body.status_message;
      expect(cy.get(".error-box > h2").contains(statusMessage));
    });
  });

  it("API 에러가 발생한 경우 response으로 내려온 에러 메세지를 ErrorBox 컴포넌트와 함께 렌더링한다.", () => {
    cy.get(".search-input").type("짱구");
    cy.get(".search-form").submit();

    expect(cy.get(".skeleton-list").should("exist"));

    // statusCode 응답 값 확인
    cy.wait("@getSearchMovieList").then((interception) => {
      const statusCode = interception.response?.statusCode;
      expect(statusCode).to.equal(501);

      expect(cy.get(".error-box").should("exist"));

      const statusMessage = interception.response?.body.status_message;
      expect(cy.get(".error-box > h2").contains(statusMessage));
    });
  });
});
