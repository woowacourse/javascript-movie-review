class HTTPError extends Error {
  statusCode: number;

  message: string;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.name = `HTTPError`;
    this.statusCode = statusCode;
    this.message = message ?? '';
  }
}

export default HTTPError;
