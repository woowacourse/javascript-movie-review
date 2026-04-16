import {  RateLocalStorageDataSource } from "../dataSources/local/RateDataSource";

import { RateRepository } from "./RateRepository";

type RepositoryType = 'localStorage';
export class RateRepositoryImpl implements RateRepository {
  localStorage: RateRepository;
  repository: RateRepository;
  constructor(repositoryType: RepositoryType){
    const rateLocalStorageRepository = new RateLocalStorageDataSource();
    this.localStorage = rateLocalStorageRepository;
    
    switch(repositoryType) {
      case "localStorage":
        this.repository = this.localStorage;
        break;
      default: 
        throw new Error("");
    }
  }
  getMovieRate(id: number){
    return this.repository.getMovieRate(id);
  }
  setMovieRate(id: number, rate: number){
    return this.repository.setMovieRate(id, rate);
  }
}
