type Mode = "popularAdd" | "searchAdd";

class Store {
  private state: { currentMode: Mode; query: string | null };

  constructor() {
    this.state = {
      currentMode: "popularAdd",
      query: null,
    };
  }

  setMode(newMode: Mode) {
    this.state.currentMode = newMode;
  }

  getMode(): Mode {
    return this.state.currentMode;
  }

  setQuery(query: string | null) {
    this.state.query = query;
  }

  getQuery(): string | null {
    return this.state.query;
  }
}

export const store = new Store();
