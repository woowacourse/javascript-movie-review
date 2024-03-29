export interface ButtonElementParams {
  type: 'button' | 'submit' | 'reset';
  id: string;
  size: string;
  variant: string;
  textContent: string;
}

export interface ButtonEventType {
  type: string;
  callbackFunction: (event: Event) => void;
}

export interface ButtonParams {
  options: ButtonElementParams;
  eventType: ButtonEventType;
}
