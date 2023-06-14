const throttle = (handler: () => void, timeout = 3000) => {
  let invokedTime: number;
  let timer: number;

  return () => {
    if (!invokedTime) {
      handler();
      invokedTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Date.now() - invokedTime >= timeout) {
          handler();
          invokedTime = Date.now();
        }
      }, Math.max(timeout - (Date.now() - invokedTime), 0));
    }
  };
};
export default throttle;
