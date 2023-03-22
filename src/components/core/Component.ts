// store
import { store } from '../atoms/Observer';

// hook
import { useStateHook } from '../hooks/useState';

export default abstract class Component {
  state;

  constructor() {
    this.state = this.useState();
  }

  useState() {
    const proxyState = store(this.render.bind(this));
    return useStateHook(proxyState);
  }

  render() {}
}
