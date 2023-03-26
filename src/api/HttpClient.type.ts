export type HttpMethod = 'GET' | 'POST' | 'PUT';

export type HttpResponse<Status extends number = number, Data = unknown> = {
  status: Status;
  ok: boolean;
  data: Data;
};

export type APISpec = {
  endpoint: `${HttpMethod} /${string}`;
  params?: Record<string, string | number | boolean>;
  response: {
    status: number;
    data: unknown;
  };
};

export type GetPath<Endpoint extends APISpec['endpoint']> =
  Endpoint extends `${HttpMethod} /${infer U}` ? `/${U}` : never;

export type GetHTTPMethod<Endpoint extends APISpec['endpoint']> =
  Endpoint extends `${infer U} /${string}` ? U : never;

export type GetParams<GenericAPISpec extends APISpec> = GenericAPISpec['params'];

export type ExtractByEndpoint<
  GenericAPISpec extends APISpec,
  Endpoint extends APISpec['endpoint'],
> = Extract<GenericAPISpec, { endpoint: Endpoint }>;

export type ExtractByHttpMethod<
  GenericAPISpec extends APISpec,
  GenericHTTPMethod extends HttpMethod,
> = Extract<GenericAPISpec, { endpoint: `${GenericHTTPMethod} /${string}` }>;
