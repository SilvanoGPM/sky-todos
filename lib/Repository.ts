import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export default class Repository {

  async save(key: string, value: Object) {
    const valueString = JSON.stringify(value);

    try {
      await AsyncStorage.setItem(key, valueString);
    } catch (err) {
      console.error(err);

      Toast.show("Aconteceu um erro ao salvar determinado valor...", {
        duration: Toast.durations.LONG,
      });
    }
  }

  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error(err);

      Toast.show("Aconteceu um erro ao tentar carregar determinado valor...", {
        duration: Toast.durations.LONG,
      });
    }
  }
}
