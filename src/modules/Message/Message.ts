import { ERROR_MESSAGES, TOAST_MESSAGES } from './constant';
import { ErrorMessageKeyType, MessageType, ToastMessageKeyType } from './type';

export default class Message<TMessageKey extends string | number> {
  #MESSAGES: MessageType<TMessageKey>;

  constructor(messages: MessageType<TMessageKey>) {
    this.#MESSAGES = messages;
  }

  get(key: TMessageKey, ...args: string[]) {
    return this.#formatMessage(this.#MESSAGES[key], ...args);
  }

  #formatMessage(message: string, ...args: string[]) {
    return args.reduce((prev, cur, index) => prev.replace(`{${index}}`, cur), message);
  }
}

export const errorMessage = new Message<ErrorMessageKeyType>(ERROR_MESSAGES);
export const toastMessage = new Message<ToastMessageKeyType>(TOAST_MESSAGES);
