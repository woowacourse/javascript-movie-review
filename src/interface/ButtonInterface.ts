export interface ButtonElementParams {
  type: 'button' | 'submit' | 'reset';
  id: string;
  textContent: string;
  variantClasses?: string[];
}

export interface ButtonParams {
  options: ButtonElementParams;
  callbackFunction: (event: Event) => void;
}
