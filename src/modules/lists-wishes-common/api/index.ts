import { AxiosHeaders, AxiosResponse } from 'axios';
import { IListsWishEditorForm, IListsWishItem } from '../typing';
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
  updatedFields: IListsWishEditorForm,
) => {
  try {
    const storedWishes = await AsyncStorage.getItem('wishes');
    const wishes: IListsWishItem[] = storedWishes
      ? JSON.parse(storedWishes)
      : [];

    const index = wishes.findIndex(wish => wish.id === id);

    if (index === -1) {
      throw new Error('Wish item not found');
    }

    const creatingDate = new Date();
    const fieldsWithDate = { ...updatedFields, creatingDate };
    const updatedWish = { ...wishes[index], ...fieldsWithDate };
    wishes[index] = updatedWish;

    await AsyncStorage.setItem('wishes', JSON.stringify(wishes));
  } catch (error) {
    //
  }
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

export const getWishItemReq = async (
  id: string,
): Promise<AxiosResponse<IListsWishItem>> => {
  let wishData: IListsWishItem | null = null;
  try {
    const response = await getAllWishesReq();
    const item = response.data.find(el => el.id === id);
    wishData = item ?? null;
  } catch {
    //
  }

  if (!wishData) {
    throw new Error('Wish item not found');
  }

  return {
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
    },
    data: wishData,
  };
};

export const getAllListsReq = async () => {};

export const getAllWishesReq = async (): Promise<
  AxiosResponse<IListsWishItem[]>
> => {
  let listData: IListsWishItem[] | null = null;
  try {
    const storedWishes = await AsyncStorage.getItem('wishes');
    if (storedWishes) {
      listData = JSON.parse(storedWishes);
    }
  } catch (error) {
    //
  }
  return {
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
    },
    data: listData ?? [],
  };
};

export const deleteWishReq = async (id: string) => {
  try {
    const allWishes = await AsyncStorage.getItem('wishes');
    const parsedWishes: IListsWishItem[] = allWishes
      ? JSON.parse(allWishes)
      : [];

    const filteredWishes = parsedWishes.filter(item => item.id !== id);

    await AsyncStorage.setItem('wishes', JSON.stringify(filteredWishes));
  } catch {
    //
  }
};
