import { RateRepository } from "../../repositories/RateRepository";

export class RateLocalStorageDataSource implements RateRepository {
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
