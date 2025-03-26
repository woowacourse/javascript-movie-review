export interface MovieItemListInstance {
  $el: HTMLUListElement;
  render: (data: any[]) => void;
}

export interface LongButtonInstance {
  $el: HTMLButtonElement;
  hide: () => void;
  setOnClick: (callback: () => void) => void;
}
