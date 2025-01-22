import { CurrenciesEnum } from '../enums';

interface IListsWish {
  id?: string;
  coverImgPath: string | number;
  creatingDate?: Date;
  itemName: string;
  hideItem: boolean;
}

export interface IWishItem extends IListsWish {
  price: number;
  currency: null | CurrenciesEnum;
  itemUrl: string;
  description: string;
}

export interface IListItem extends IListsWish {
  collection?: any;
  wishes?: IWishItem[] | null;
}

export interface IWishEditorForm extends Omit<IWishItem, 'id' | 'creatingDate'> {}

export interface IListEditorForm
  extends Omit<IListItem, 'id' | 'creatingDate' | 'wishes'> {}
