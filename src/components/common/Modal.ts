import { $ } from '@/lib/utils';
import { Component } from '../core';
import { Props, State } from '../core/Component';

export default abstract class Modal<TProps extends Props = {}, TState extends State = {}> extends Component<
  TProps,
  TState
> {
  abstract id: string;

  show() {
    $(`#${this.id}`)?.appendChild(this.element);

    setTimeout(() => {
      this.remove();
    }, 1000);
  }

  remove() {
    this.element.remove();
  }
}
