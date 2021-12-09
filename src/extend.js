/**
 * @template { unknown } C context
 * @template { unknown } R result
 * @param { ((ctx: C) => R)[] } fns
 * @returns
 */
export const extend =
  (...fns) =>
  /** @param { (ctx: C, ...args: R[]) => unknown } callback */
  (callback) =>
  /** @param { C } ctx */
  (ctx, ...rest) =>
    callback(ctx, ...fns.map((fn) => fn(ctx)), ...rest)
