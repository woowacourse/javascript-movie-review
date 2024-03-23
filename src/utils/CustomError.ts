class CustomError extends Error {
  status;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default CustomError;
