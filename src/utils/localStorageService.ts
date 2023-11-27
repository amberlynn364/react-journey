interface LocalStorageService {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

const localStorageSerive: LocalStorageService = {
  get(key: string): string | null {
    const value = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
    return value;
  },
  set(key: string, value: string): void {
    if (typeof window !== 'undefined') localStorage.setItem(key, value);
  },
  remove(key: string): void {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  },
};

export default localStorageSerive;
