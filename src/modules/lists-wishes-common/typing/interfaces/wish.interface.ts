import { Omit } from 'lodash';
import { CurrenciesEnum } from '../enums';


export interface IListsWishItem {
  id?: string;
  coverImgPath: string | number;
  creatingDate: Date;
  itemName: string;
  price: number;
  currency: null | CurrenciesEnum;
  itemUrl: string;
  description: string;
  hideWishes: boolean;
}

export interface IListsWishEditorForm
  extends Omit<IListsWishItem, 'id' | 'creatingDate'> {
  collection?: any;
}
