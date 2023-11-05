interface LocalStorageService {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

const localStorageSerive: LocalStorageService = {
  get(key: string): string | null {
    const value = localStorage.getItem(key);
    return value;
  },
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

export default localStorageSerive;
