import { $ } from '@/lib/utils';
import { Component } from '../core';
import { Props, State } from '../core/Component';

export default class Modal<TProps extends Props = {}, TState extends State = {}> extends Component<TProps, TState> {
  show(id: string) {
    $(`#${id}`)?.appendChild(this.element);

    setTimeout(() => {
      this.remove();
    }, 1000);
  }

  remove() {
    this.element.remove();
  }
}
