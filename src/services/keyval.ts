import {
  set as keyvalSet,
  get as keyvalGet,
  update as keyvalUpdate,
  del as keyvalDelete,
  clear as keyvalClear
} from "idb-keyval";

const keys = ["items"] as const;
type Keys = typeof keys[number]

const set = async <T>(key: Keys, value: T) => {
  try {
    const res = await keyvalSet(key, value);
    return res;
  } catch (e) {
    console.error(e)
  }
}

const get = async (key: Keys) => {
  try {
    const res = await keyvalGet(key);
    return res;
  } catch (e) {
    console.error(e)
  }
}

const update = async <T>(key: Keys, value: T) => {
  try {
    const res = await keyvalUpdate(key, () => value);
    return res;
  } catch (e) {
    console.error(e)
  }
}

const del = async (key: Keys) => {
  try {
    const res = await keyvalDelete(key);
    return res;
  } catch (e) {
    console.error(e)
  }
}

const clear = async () => {
  try {
    await keyvalClear();
  } catch (e) {
    console.error(e)
  }
}

export {
  set,
  get,
  update,
  del,
  clear
}