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

export type GetPath<GenericAPISpec extends APISpec> =
  GenericAPISpec['endpoint'] extends `${HTTPMethod} /${infer U}` ? `/${U}` : never;

export type GetHTTPMethod<GenericAPISpec extends APISpec> =
  GenericAPISpec['endpoint'] extends `${infer U} /${string}` ? U : never;

export type GetParams<GenericAPISpec extends APISpec> = GenericAPISpec['params'];

export type ExtractHTTPMethod<
  GenericAPISpec extends APISpec,
  GenericHTTPMethod extends HTTPMethod,
> = Extract<GenericAPISpec, { endpoint: `${GenericHTTPMethod} /${string}` }>;

export type GetSuccess<Response> = Extract<Response, { status: HTTPStatusOK }>;

export type GetFailure<Response> = Extract<Response, { status: HTTPStatusFailure }>;
