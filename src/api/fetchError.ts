export class ServerResponseTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerResponseTypeError";
  }
}

export class ServerError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ServerError";
    this.status = status;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}
