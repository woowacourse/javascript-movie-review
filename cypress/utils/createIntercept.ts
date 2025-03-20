interface CreateInterceptParameter {
  id: string;
  url: string;
  fixtureUrl: string;
  delay?: number;
}

export const createIntercept = ({
  id,
  url,
  fixtureUrl,
  delay = 0,
}: CreateInterceptParameter) => {
  const urlRegexp = new RegExp(url);

  cy.intercept(
    {
      method: "GET",
      url: urlRegexp,
    },
    (req) => {
      req.continue((res) => {
        res.setDelay(delay);
        res.send({ fixture: fixtureUrl });
      });
    }
  ).as(id);
};
