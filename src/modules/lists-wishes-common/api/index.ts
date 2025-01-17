import { AxiosHeaders, AxiosResponse } from 'axios';
import { wishesMockData } from '../mock';
import { IListsWishItem } from '../typing';
import UUID from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addWishReq = async (payload: Omit<IListsWishItem, 'id'>) => {
  try {
    const newWish: IListsWishItem = {
      ...payload,
      id: UUID.v4(),
      creatingDate: new Date(),
    };
    const storedWishes = JSON.parse(
      (await AsyncStorage.getItem('wishes')) || '[]',
    );
    const updatedWishes = JSON.stringify([newWish, ...storedWishes]);

    await AsyncStorage.setItem('wishes', updatedWishes);
  } catch (error) {
    //
  }
};

export const changeWishReq = async (
  id: string,
  updatedFields: Partial<IListsWishItem>,
) => {
  console.log('id: ', id, 'updatedFields: ', updatedFields);
};

export const createListReq = async (payload: any) => {
  console.log(payload);
};

export const changeListReq = async (
  id: string,
  updatedFields: Partial<IListsWishItem>,
) => {
  console.log('id: ', id, 'updatedFields: ', updatedFields);
};

export const getListOfListsReq = async () => {};

export const getWishesListReq = async (): Promise<AxiosResponse<IListsWishItem[]>> => {
  return {
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
    },
    data: wishesMockData,
  };
};
