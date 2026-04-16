import { RateRepository } from "../../repositories/RateRepository";

export class RateLocalStorageDataSource implements RateRepository {
  #getRates(){
    try {
      const rates = localStorage.getItem('rates');
      if(!rates) return {};
      return JSON.parse(rates);
    } catch (error) {
      console.error(error);
      return {};
    }
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
