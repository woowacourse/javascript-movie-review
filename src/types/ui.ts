import { INVALID_MESSAGE_TYPES } from '../constants/invalidMessage';

type InvalidMessageType = (typeof INVALID_MESSAGE_TYPES)[number];

interface InvalidMessage {
  HEADING: string | ((message: string) => string);
  CONTENT: string;
}

export { InvalidMessageType, InvalidMessage };
