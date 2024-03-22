export type FetchOption = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: BodyInit | null;
  headers: HeadersInit;
};
