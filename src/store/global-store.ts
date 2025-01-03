import { ICountry } from 'typing';
import { create } from 'zustand';

interface IProps {
  countriesList: ICountry[];
  setCountriesList: (countriesData: ICountry[]) => void;
}

export const useGlobalStore = create<IProps>(set => ({
  countriesList: [],
  setCountriesList: countriesData => set({ countriesList: countriesData }),
}));
