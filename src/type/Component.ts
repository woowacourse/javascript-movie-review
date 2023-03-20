import { Movie } from './Movie';

type Render = ((query?: string) => void) | (() => void) | ((movie: Movie) => void);
type Template = ((query?: string) => string) | (() => string) | ((movie: Movie) => string);
type SetEvent = () => void;

export default interface Component {
  render: Render;
  template: Template;
  setEvent: SetEvent;
}
