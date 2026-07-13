import { StateStorage } from 'zustand/middleware';

type KvStore = {
  getItem?: (key: string) => string | null | Promise<string | null>;
  setItem?: (key: string, value: string) => void | Promise<void>;
  removeItem?: (key: string) => void | Promise<void>;
};

type KvStoreModule = KvStore & {
  default?: KvStore;
  Storage?: KvStore;
  AsyncStorage?: KvStore;
};

const memoryStorage = new Map<string, string>();

function isBunTestRuntime() {
  return typeof Bun !== 'undefined' && process.env.NODE_ENV === 'test';
}

let expoKvStorePromise: Promise<KvStore | undefined> | undefined;

async function loadExpoKvStore(): Promise<KvStore | undefined> {
  if (isBunTestRuntime()) {
    return undefined;
  }

  try {
    const module = (await import('expo-sqlite/kv-store')) as KvStoreModule;

    return module.default ?? module.Storage ?? module.AsyncStorage ?? module;
  } catch {
    return undefined;
  }
}

function getExpoKvStore() {
  expoKvStorePromise ??= loadExpoKvStore();

  return expoKvStorePromise;
}

export const persistentStorage: StateStorage = {
  getItem: async (key) => {
    const expoKvStore = await getExpoKvStore();

    if (expoKvStore?.getItem) {
      return expoKvStore.getItem(key);
    }

    return memoryStorage.get(key) ?? null;
  },
  setItem: async (key, value) => {
    const expoKvStore = await getExpoKvStore();

    if (expoKvStore?.setItem) {
      return expoKvStore.setItem(key, value);
    }

    memoryStorage.set(key, value);
  },
  removeItem: async (key) => {
    const expoKvStore = await getExpoKvStore();

    if (expoKvStore?.removeItem) {
      return expoKvStore.removeItem(key);
    }

    memoryStorage.delete(key);
  },
};
