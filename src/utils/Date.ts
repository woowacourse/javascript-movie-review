interface DateContract {
  year: number;
  month: number;
  date: number;
}

class Date implements DateContract {
  #year: number;
  #month: number;
  #date: number;

  constructor(dateString: string) {
    const parts = dateString.split("-");
    if (parts.length < 3) {
      throw new Error("올바른 형식이 아닙니다. YYYY-M-D");
    }
    this.#year = parseInt(parts[0], 10);
    this.#month = parseInt(parts[1], 10);
    this.#date = parseInt(parts[2], 10);
  }

  public get year(): number {
    return this.#year;
  }

  public get month(): number {
    return this.#month;
  }

  public get date(): number {
    return this.#date;
  }
}

export default Date;
