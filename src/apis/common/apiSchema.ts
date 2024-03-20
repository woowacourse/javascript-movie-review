import { HTTPMethod } from './apiSchema.type';

class ApiSchema {
  constructor(private url: string, private httpMethod: HTTPMethod = 'GET') {
    this.url = url;
    this.httpMethod = httpMethod;
  }

  async request(): Promise<Response | undefined> {
    try {
      const response = await fetch(this.url, { method: this.httpMethod });

      this.handleProcessStatusCode(response);

      return response;
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  private handleProcessStatusCode(response: Response) {
    switch (response.status) {
      case 500:
        throw new Error('네트워크 에러가 발생했습니다.');
    }
  }
}

export default ApiSchema;
