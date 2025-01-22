import { AxiosHeaders, AxiosResponse } from 'axios';
import { IListItem, IWishEditorForm, IWishItem } from '../typing';
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

export const changeWishReq = async (id: string, updatedFields: IWishEditorForm) => {
  try {
    const storedWishes = await AsyncStorage.getItem('wishes');
    const wishes: IWishItem[] = storedWishes ? JSON.parse(storedWishes) : [];

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

export const createListReq = async (payload: Omit<IListItem, 'id'>) => {
  try {
    const newList: IListItem = {
      ...payload,
      id: UUID.v4(),
      creatingDate: new Date(),
    };
    const storedWishes = JSON.parse(
      (await AsyncStorage.getItem('lists')) || '[]',
    );
    const updatedWishes = JSON.stringify([newList, ...storedWishes]);

    await AsyncStorage.setItem('lists', updatedWishes);
  } catch (error) {
    //
  }
};

export const changeListReq = async (id: string, updatedFields: Partial<IWishItem>) => {
  console.log('id: ', id, 'updatedFields: ', updatedFields);
};

export const getWishItemReq = async (
  id: string,
): Promise<AxiosResponse<IWishItem>> => {
  let wishData: IWishItem | null = null;
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

export const getAllListsReq = async (): Promise<AxiosResponse<IListItem[]>> => {
  let listsData: IListItem[] | null = null;
  try {
    const storedLists = await AsyncStorage.getItem('lists');
    if (storedLists) {
      listsData = JSON.parse(storedLists);
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
    data: listsData ?? [],
  };
};

export const getAllWishesReq = async (): Promise<AxiosResponse<IWishItem[]>> => {
  let wishesData: IWishItem[] | null = null;
  try {
    const storedWishes = await AsyncStorage.getItem('wishes');
    if (storedWishes) {
      wishesData = JSON.parse(storedWishes);
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
    data: wishesData ?? [],
  };
};

export const deleteWishReq = async (id: string) => {
  try {
    const allWishes = await AsyncStorage.getItem('wishes');
    const parsedWishes: IWishItem[] = allWishes ? JSON.parse(allWishes) : [];

    const filteredWishes = parsedWishes.filter(item => item.id !== id);

    await AsyncStorage.setItem('wishes', JSON.stringify(filteredWishes));
  } catch {
    //
  }
};

export const deleteListReq = async (id: string) => {
  try {
    const allLists = await AsyncStorage.getItem('lists');
    const parsedLists: IWishItem[] = allLists ? JSON.parse(allLists) : [];

    const filteredLists = parsedLists.filter(item => item.id !== id);

    await AsyncStorage.setItem('lists', JSON.stringify(filteredLists));
  } catch {
    //
  }
};
