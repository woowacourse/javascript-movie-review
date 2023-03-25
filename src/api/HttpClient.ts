import { HttpClientNetworkError } from './errors/HttpClientNetworkError';
import {
  APISpec,
  ExtractByEndpoint,
  ExtractByHttpMethod,
  GetParams,
  GetPath,
  GetSuccess,
  HttpResponse,
} from './HttpClient.type';

export abstract class HttpClient<GenericAPISpec extends APISpec> {
  constructor(protected readonly base: string) {}

  isSuccess<GenericHTTPResponse extends HttpResponse>(
    response: GenericHTTPResponse,
  ): response is GetSuccess<GenericHTTPResponse> {
    return response.ok;
  }

  getURL(path: string): URL {
    return new URL(path, this.base);
  }

  async fetch<GenericHTTPResponse extends HttpResponse>(
    url: URL,
    init?: RequestInit,
  ): Promise<GenericHTTPResponse> {
    try {
      const res = await fetch(url, init);

      return {
        status: res.status,
        ok: res.ok,
        data: await res.json(),
      } as GenericHTTPResponse;
    } catch (error) {
      throw new HttpClientNetworkError();
    }
  }

  async get<
    GETAPISpec extends ExtractByHttpMethod<GenericAPISpec, 'GET'>,
    Path extends GetPath<GETAPISpec['endpoint']>,
  >(
    path: Path,
    params?: GetParams<ExtractByEndpoint<GETAPISpec, `GET ${Path}`>>,
  ): Promise<ExtractByEndpoint<GETAPISpec, `GET ${Path}`>['response']> {
    const url = this.getURL(path);
    Object.entries(params ?? {}).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    return this.fetch(url, { method: 'GET' });
  }

  async post<
    POSTAPISpec extends ExtractByHttpMethod<GenericAPISpec, 'POST'>,
    Path extends GetPath<POSTAPISpec['endpoint']>,
  >(
    path: Path,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<ExtractByEndpoint<POSTAPISpec, `POST ${Path}`>['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'POST', ...init });
  }

  async put<
    PUTAPISpec extends ExtractByHttpMethod<GenericAPISpec, 'PUT'>,
    Path extends GetPath<PUTAPISpec['endpoint']>,
  >(
    path: Path,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<ExtractByEndpoint<PUTAPISpec, `PUT ${Path}`>['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'PUT', ...init });
  }
}
