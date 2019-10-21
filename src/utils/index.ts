export const mockAsync = <T>(data: T, duration: number = 0) => (rejection: boolean = false) =>
  new Promise<T>((res, rej) => {
    window.setTimeout(() => {
      rejection ? rej() : res(data);
    }, duration);
  });
