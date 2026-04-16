interface RateRepository {
  getMovieRate(id: number): number;
  setMovieRate(id: number, rate: number): void
}

export class RateLocalStroageRepository implements RateRepository {
  #getRates(){
    const rates = localStorage.getItem('rates') || "{}";
    return JSON.parse(rates) || {};
  }
  getMovieRate(id: number){
    const rates = this.#getRates();

    return rates[id];
  }
  setMovieRate(id: number, rate: number){
    const prevRates = this.#getRates();
    const rates = { ...prevRates, [id]: rate };
    localStorage.setItem('rates', JSON.stringify(rates));
  }
}
