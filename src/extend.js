/**
 * @template { unknown } C context
 * @template { unknown } R result
 * @param { ((ctx: C) => R)[] } fns
 * @returns
 */
export const ext =
  (...fns) =>
  /** @param { (ctx: C, ...args: R[]) => unknown } target */
  (target) =>
  /** @param { C } ctx */
  (ctx) =>
    target(ctx, ...fns.map((fn) => fn(ctx)))
