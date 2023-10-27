/**
 * Memoize decorator
 * @param timeout
 */
export const memoize =
  (timeout: number = 0.1 * 1000) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const cache = new Map();

    // we need to cache the result of the function for 1 minute
    descriptor.value = async function (...args: any[]) {
      const key = `${JSON.stringify(target)}-${propertyKey}-${args
        .map((arg) => JSON.stringify(arg))
        .join('-')}`;

      if (cache.has(key)) {
        console.debug('CACHED_RESULT_RETURNED');
        return cache.get(key);
      }

      const result = await originalMethod.apply(this, args);
      cache.set(key, result);

      setTimeout(() => {
        cache.delete(key);
      }, timeout);

      return result;
    };

    return descriptor;
  };
