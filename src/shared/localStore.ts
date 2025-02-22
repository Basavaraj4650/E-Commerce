import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromLocalStorage = async (name: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data from AsyncStorage:', e);
    return null;
  }
};

export const setToLocalStorage = async (name: string, value: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
    throw error;
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
};
