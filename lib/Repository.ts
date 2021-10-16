import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { TOAST_VISIBILITY_TIME } from "../globals";

export default class Repository {
  async save(key: string, value: Object) {
    const valueString = JSON.stringify(value);

    try {
      await AsyncStorage.setItem(key, valueString);
    } catch (err) {
      console.error(err);

      Toast.show({
        type: "error",
        text1: "Aconteceu um erro ao salvar determinado valor...",
        visibilityTime: TOAST_VISIBILITY_TIME.short,
        position: "bottom",
      });
    }
  }

  async get<T>(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (err) {
      console.error(err);

      Toast.show({
        type: "error",
        text1: "Aconteceu um erro ao tentar carregar determinado valor...",
        visibilityTime: TOAST_VISIBILITY_TIME.short,
        position: "bottom",
      });
    }
  }
}
