export class APIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "APIError";
  }
}

export class UnknownError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnknownError";
  }
}