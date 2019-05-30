export interface ResultMatchPattern<T, E, X> {
    Success: (value: T) => X;
    Failure: (error: E) => X;
}
export interface Result<T, E> {
    apply<U, V>(this: Result<(parameter: U) => V, E>, parameteOrFunction: U | (() => U) | Result<U, E> | (() => Result<U, E>)): Result<V, E>;
    assign<T extends object, U>(this: Result<T, E>, key: string, other: U | ((value: T) => U)): Result<T & {
        [key in string]: U;
    }, E>;
    chain<U>(f: (value: T) => Result<U, E>): Result<U, E>;
    getErrorOrElse(alternative: E | ((value: T) => E)): E;
    getOrElse(alternative: T | ((error: E) => T)): T;
    isFailure(): boolean;
    isSuccess(): boolean;
    map<U>(f: (value: T) => U): Result<U, E>;
    mapError<F>(f: (F: any) => F): Result<T, F>;
    match<X>(pattern: ResultMatchPattern<T, E, X>): X;
    orAttempt(alternative: (error: E) => Result<T, E>): Result<T, E>;
    orElse(alternative: T | ((error: E) => T)): Result<T, E>;
    perform(sideEffect: (value: T) => void): Result<T, E>;
    performOnError(sideEffect: (error: E) => void): Result<T, E>;
}
