import { AxiosHeaders, AxiosResponse } from 'axios';
import { wishesMockData } from '../mock';
import { IWishItem } from '../typing';
import UUID from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addWishReq = async (payload: Omit<IWishItem, 'id'>) => {
  try {
    const newWish: IWishItem = {
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
  updatedFields: Partial<IWishItem>,
) => {
  console.log('id: ', id, 'updatedFields: ', updatedFields);
};

export const createListReq = async (payload: any) => {
  console.log(payload);
};

export const changeListReq = async (
  id: string,
  updatedFields: Partial<IWishItem>,
) => {
  console.log('id: ', id, 'updatedFields: ', updatedFields);
};

export const getListOfListsReq = async () => {};

export const getWishesListReq = async (): Promise<
  AxiosResponse<IWishItem[]>
> => {
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
