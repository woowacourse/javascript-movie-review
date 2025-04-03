import { ERROR_MESSAGES, TOAST_MESSAGES } from './constant';

export type MessageType<TMessageKey extends string | number> = Record<TMessageKey, string>;

export type ErrorMessageKeyType = keyof typeof ERROR_MESSAGES;
export type ToastMessageKeyType = keyof typeof TOAST_MESSAGES;
