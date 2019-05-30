export interface SettledMatchPattern<T, E, X> {
    Resolved: (T: any) => X;
    Rejected: (E: any) => X;
}
export interface Settled<T, E> {
    map<U>(f: (value: T) => U): Settled<U, E>;
    mapError<F>(f: (error: E) => F): Settled<T, F>;
    match<X>(pattern: SettledMatchPattern<T, E, X>): any;
    getErrorOrElse(alternative: E | ((value: T) => E)): E;
    getOrElse(alternative: T | ((error: E) => T)): T;
    perform(sideEffect: (value: T) => void): any;
    performOnError(sideEffect: (error: E) => void): any;
    run(whenFulfilled: (value: T) => void, whenRejected: (error: E) => void): any;
}
