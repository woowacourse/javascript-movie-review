export interface Component {
  $element: Element;
  render: () => void;
  template: () => string;
  setEvent?: () => void;
}
