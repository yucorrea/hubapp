import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_PREFIX = "@hubapp:1.0";

export async function saveStorage(key: string, param: unknown) {
  try {
    const json = JSON.stringify(param);

    await AsyncStorage.setItem(`${APP_PREFIX}:${key}`, json)
  }catch(err) {
    throw err;
  }
}

export async function getStorage<T>(key: string) {
  try {
    const data = await AsyncStorage.getItem(`${APP_PREFIX}:${key}`)

    if(!data) return null

    return JSON.parse(data) as T
  }catch(err) {
    throw err;
  }
}