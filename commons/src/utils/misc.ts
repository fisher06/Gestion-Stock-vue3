export type millisecond = number;
export const sleep = (delay: millisecond): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));
