export const debounce = (func: (...params: any) => any, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...params: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(params);
    }, wait);
  };
};
