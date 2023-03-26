interface Component {
  readonly node: HTMLElement;
  composeNode(): this;
}

export default Component;
