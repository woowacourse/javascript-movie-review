const POPULAR_MOVIE_LIST_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=ef7c54f21b65b1fe66b6cf70349fa55f&language=ko&page=1";

const HARRY_POTTER_MOVIE_LIST_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ef7c54f21b65b1fe66b6cf70349fa55f&language=ko&page=1&query=해리포터";

describe("api 요청 e2e 테스트", () => {
  it("인기순 영화 리스트 1페이지 요청에 성공할 경우 상태 코드 200을 받아야 한다.", () => {
    cy.request("GET", POPULAR_MOVIE_LIST_API).its("status").should("eq", 200);
  });

  it("인기순 영화 리스트 1페이지 요청을 할 경우 20개의 영화 데이터를 받아야 한다.", () => {
    cy.request("GET", POPULAR_MOVIE_LIST_API).its("body.results").should("have.length", 20);
  });

  it("해리포터 영화 리스트 요청에 성공할 경우 상태 코드 200을 받아야 한다.", () => {
    cy.request("GET", HARRY_POTTER_MOVIE_LIST_API).its("status").should("eq", 200);
  });
});
