export type HTTPMethod = 'GET' | 'POST' | 'PUT';

export type HTTPStatus = 200 | 400 | 401 | 403 | 404;

export type HTTPStatusOK = 200;

export type HTTPStatusFailure = Exclude<HTTPStatus, HTTPStatusOK>;

export type HTTPResponse<Status extends HTTPStatus = HTTPStatus, Data = unknown> = {
  status: Status;
  ok: boolean;
  data: Data;
};

export type APISpec = {
  endpoint: `${HTTPMethod} /${string}`;
  params: Record<string, string | number | boolean>;
  response: {
    status: number;
    data: unknown;
  };
};

export type GetPath<Endpoint extends APISpec['endpoint']> =
  Endpoint extends `${HTTPMethod} /${infer U}` ? `/${U}` : never;

export type GetHTTPMethod<Endpoint extends APISpec['endpoint']> =
  Endpoint extends `${infer U} /${string}` ? U : never;

export type GetParams<GenericAPISpec extends APISpec> = GenericAPISpec['params'];

export type ExtractByEndpoint<
  GenericAPISpec extends APISpec,
  Endpoint extends APISpec['endpoint'],
> = Extract<GenericAPISpec, { endpoint: Endpoint }>;

export type ExtractByHTTPMethod<
  GenericAPISpec extends APISpec,
  GenericHTTPMethod extends HTTPMethod,
> = Extract<GenericAPISpec, { endpoint: `${GenericHTTPMethod} /${string}` }>;

export type GetSuccess<Response> = Extract<Response, { status: HTTPStatusOK }>;

export type GetFailure<Response> = Extract<Response, { status: HTTPStatusFailure }>;
