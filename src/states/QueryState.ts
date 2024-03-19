import Observable from "./abstract/Observable";

type Query = string;

export default class QueryState extends Observable {
  private query: Query = "";

  public setQuery(query: Query): void {
    this.query = query;
    this.notify();
  }

  public getQuery(): Query {
    return this.query;
  }
}
