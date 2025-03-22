interface GenericStaticResponse<Fixture, Body> {
  fixture?: Fixture;
  body?: Body;
  headers?: { [key: string]: string };
  statusCode?: number;
  forceNetworkError?: boolean;
  throttleKbps?: number;
  delay?: number;
}

type StaticResponse = GenericStaticResponse<
  string,
  string | object | boolean | ArrayBuffer | null
>;

interface CreateInterceptParameter {
  id: string;
  url: string;
  delay?: number;
  staticResponse: StaticResponse;
}

export const createIntercept = ({
  id,
  url,
  delay = 0,
  staticResponse,
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
        res.send(staticResponse);
      });
    }
  ).as(id);
};
