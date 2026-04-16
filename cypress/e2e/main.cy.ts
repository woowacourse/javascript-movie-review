describe("메인 화면 최초 진입 시나리오 테스트", () => {
  const mockMovies = (
    count: number,
    titlePrefix: string,
    page: number,
    totalPages: number,
  ) => ({
    results: Array.from({ length: count }, (_, i) => ({
      id: 1000 + i + (page - 1) * 20,
      title: `${titlePrefix} ${i + 1 + (page - 1) * 20}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 8.5,
    })),
    page,
    total_pages: totalPages,
  });

  const visitMainPage = () => {
    cy.visit("http://localhost:5173/");
  };

  const scrollToBottom = () => {
    cy.scrollTo("bottom");
    cy.wait(300);
  };

  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?*page=1*", (req) => {
      req.reply({
        delay: 300,
        body: mockMovies(20, "인기 영화", 1, 2),
      });
    }).as("getPopularP1");

    cy.intercept(
      "GET",
      "**/movie/popular?*page=2*",
      mockMovies(20, "인기 영화", 2, 2),
    ).as("getPopularP2");
  });

  it("1. 배너에 첫 번째 인기 영화의 정보가 표시된다.", () => {
    visitMainPage();
    cy.wait("@getPopularP1");

    cy.get(".thumbnail-list li:first-child")
      .find("strong")
      .invoke("text")
      .then((firstMovieTitle) => {
        cy.get(".title").should("have.text", firstMovieTitle);
      });
  });

  it("2. 최초 진입 시 인기 영화 최대 20개가 표시된다.", () => {
    visitMainPage();

    cy.get(".movie-skeleton").should("have.length.at.least", 1);
    cy.wait("@getPopularP1");
    cy.get(".movie-skeleton").should("not.exist");
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("3. 스크롤을 내리면 무한 스크롤 방식으로 영화가 최대 20개씩 추가된다.", () => {
    visitMainPage();
    cy.wait("@getPopularP1");
    cy.get(".thumbnail-list li").should("have.length", 20);

    scrollToBottom();
    cy.wait("@getPopularP2");

    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("4. 더 이상 보여 줄 영화가 없으면 영화를 가져오지 않는다.", () => {
    visitMainPage();
    cy.wait("@getPopularP1");

    scrollToBottom();
    cy.wait("@getPopularP2");
    cy.get(".thumbnail-list li").should("have.length", 40);

    scrollToBottom();

    cy.get("@getPopularP2.all").should("have.length", 1);
    cy.get(".thumbnail-list li").should("have.length", 40);
  });
});
