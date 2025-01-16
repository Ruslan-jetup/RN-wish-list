import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const setAsyncStorageData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      //
    }
  };

  const getAsyncStorageData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value) {
        const parsedValue = JSON.parse(value);

        return parsedValue;
      } else {
        return null;
      }
    } catch (e) {
      //
    }
  };

  const removeAsyncStorageData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data', e);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  };

  const mergeAsyncStorageData = async (key: string, value: any) => {
    try {
      const existingData = await getAsyncStorageData(key);
      const newData = { ...existingData, ...value };
      await setAsyncStorageData(key, newData);
    } catch (e) {
      console.error('Error merging data', e);
    }
  };

  return {
    setAsyncStorageData,
    getAsyncStorageData,
    removeAsyncStorageData,
    clearAsyncStorage,
    mergeAsyncStorageData,
  };
};
