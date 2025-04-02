export default class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public error(message: string, error?: Error): void {
    console.error(message, error);
  }

  public warn(message: string, error?: Error): void {
    console.warn(message, error);
  }

  public info(message: string): void {
    console.info(message);
  }
}
