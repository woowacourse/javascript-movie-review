import { Subject } from './Subject';

export type State<Label extends string = string, Value = unknown> = {
  label: Label;
  value: Value;
};

export class StateSubject<
  GenericState extends State,
  GenericError extends Error = Error,
> extends Subject<GenericState, GenericError> {}
