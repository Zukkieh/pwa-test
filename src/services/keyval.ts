import {
  set as keyvalSet,
  get as keyvalGet,
  update as keyvalUpdate,
  del as keyvalDelete,
  clear as keyvalClear,
} from "idb-keyval";
import { Item } from "../types/list";

const keys = ["items"] as const;
type Keys = (typeof keys)[number];

type Response = {
  items: Item[];
};

const set = async <T>(key: Keys, value: T) => {
  try {
    const res = await keyvalSet(key, value);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const get = async <Key extends Keys>(key: Key): Promise<Response[Key]> => {
  try {
    const res = await keyvalGet(key);
    return res;
  } catch (e) {
    console.error(e);
    throw new Error("Error on getting data");
  }
};

const update = async <T>(key: Keys, value: T) => {
  try {
    const res = await keyvalUpdate(key, () => value);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const del = async (key: Keys) => {
  try {
    const res = await keyvalDelete(key);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const clear = async () => {
  try {
    await keyvalClear();
  } catch (e) {
    console.error(e);
  }
};

export { set, get, update, del, clear };
