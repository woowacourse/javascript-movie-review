type Mode = "popularAdd" | "searchAdd";

class Store {
  private state: { currentMode: Mode };

  constructor() {
    this.state = { currentMode: "popularAdd" };
  }

  setMode(newMode: Mode) {
    this.state.currentMode = newMode;
  }

  getMode(): Mode {
    return this.state.currentMode;
  }
}

export const store = new Store();
