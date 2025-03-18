interface Options {
  root: Element | null;
  rootComponent: (() => string) | null; //App 컴포넌트
}

const Core = () => {
  const options: Options = {
    root: null,
    rootComponent: null,
  };

  const _render = () => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;

    root.innerHTML = rootComponent();
  };

  const render = (
    rootComponent: Options["rootComponent"],
    root: Options["root"]
  ) => {
    options.root = root;
    options.rootComponent = rootComponent;

    _render();
  };

  const reRender = () => {
    _render();
  };
  return { render, reRender };
};

export const { render, reRender } = Core();
