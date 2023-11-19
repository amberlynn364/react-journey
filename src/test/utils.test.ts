import calculateTotalPages from '../utils/calculateTotalPages';
import debounce from '../utils/debounce';
import localStorageSerive from '../utils/localStorageService';

describe('local storage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get a value from local storage', () => {
    const key = 'test-key';
    const value = 'test-value';

    localStorage.setItem(key, value);

    expect(localStorage.getItem(key)).toEqual(value);
    expect(localStorageSerive.get(key)).toEqual(value);
  });

  it('should remove a value from local storage', () => {
    const key = 'test-key';
    const value = 'test-value';

    localStorageSerive.set(key, value);
    localStorageSerive.remove(key);
    expect(localStorage.getItem(key)).toBeNull();
    expect(localStorageSerive.get(key)).toBeNull();
  });
});

describe('calculateTotalPages', () => {
  it('calculates total pages correctly', () => {
    const totalItems = 15;
    const itemPerPage = 5;

    const result = calculateTotalPages(totalItems, itemPerPage);

    expect(result).toBe(3);
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('should debounce the callback function', () => {
    const callback = jest.fn();
    const debouncedCallback = debounce(callback, 1000);

    debouncedCallback();
    jest.advanceTimersByTime(500);
    debouncedCallback();
    jest.advanceTimersByTime(500);
    debouncedCallback();
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
