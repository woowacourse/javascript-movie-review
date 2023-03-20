export const interceptFetch = (fixture: string) => {
  cy.intercept(
    {
      method: "GET",
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture }
  );
};
