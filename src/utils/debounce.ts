type DebounceCallback<T> = (...args: T[]) => void;

export default function debounce<T>(
  callback: DebounceCallback<T>,
  delay: number
): DebounceCallback<T> {
  let timer: NodeJS.Timeout;
  return (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}
