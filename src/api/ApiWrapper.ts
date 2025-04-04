import { eventEmitter } from "../util/eventEmitter";

export async function ApiWrapper<T>(callback: () => Promise<T>) {
  try {
    eventEmitter.emit("loading:start");
    const result = await callback();
    return result;
  } catch (error) {
    const code = Number((error as Error).message);
    eventEmitter.emit("openMessageModal:error", code);
  } finally {
    eventEmitter.emit("loading:end");
  }
}
