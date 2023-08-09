let timer: NodeJS.Timeout;

export const debounce = (callback: () => void, timeout: number) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, timeout);
};
