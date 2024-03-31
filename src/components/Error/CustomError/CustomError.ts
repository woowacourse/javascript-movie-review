import type { ErrorType } from './error.type';

class CustomError extends Error {
  constructor({ name, message }: { name: ErrorType; message: string }) {
    super(message);
    this.name = name;
  }
}

export default CustomError;
