import Observable from "./abstract/Observable";

export type Query = string;

export default class QueryState extends Observable {
  private query: Query;

  constructor(query = "") {
    super();
    this.query = query;
  }

  public set(query: Query): void {
    this.query = query;
    this.notify();
  }

  public get(): Query {
    return this.query;
  }
}
