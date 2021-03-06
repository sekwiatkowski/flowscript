import {some} from './Some'
import {none} from './None'
import {
    equivalence,
    Equivalence,
    Future,
    guardedStrictEquality,
    neitherIsUndefinedOrNull,
    Predicate,
    Result,
    Validated
} from '..'

export interface Option<A> {
    //region Access
    getOrElse(alternative: A | (() => A)): A
    //endregion

    //region Application
    apply<B, C>(this: Option<(parameter: B) => C>, argumentOrOptionOrFunction: B | (() => B) | Option<B> | (() => Option<B>)) : Option<C>
    //endregion

    //region Chaining
    chain<B>(f: (value: A) => Option<B>): Option<B>
    //endregion

    //region Comprehension
    assign<A extends object, K extends string, B>(
        this: Option<A>,
        key: Exclude<K, keyof A>,
        memberOptionOrValueOrFunction: Option<B> | ((value: A) => Option<B>) | B | ((value: A) => B)): Option<A & { [key in K]: B }>
    //endregion

    //region Conversion
    toFuture<E>(error: E): Future<A, E>
    toResult<E>(error: E): Result<A, E>
    toValidated<E>(error: E): Validated<A, E>
    //endregion

    //region Fallback
    orElse(alternative: A | (() => A)): Option<A>
    orAttempt(alternative: () => Option<A>): Option<A>
    //endregion

    //region Filtering
    filter(predicate: (value: A) => boolean): Option<A>
    //endregion

    //region Mapping
    map<B>(f: (value: A) => B): Option<B>
    //endregion

    //region Matching
    match<B>(onSome: (value: A) => B, onNone: () => B): B
    //endregion

    //region Side-effects
    perform(sideEffect: (value: A) => void): Option<A>
    performOnNone(sideEffect: () => void): Option<A>
    performOnBoth(sideEffect: () => void): Option<A>
    //endregion

    //region Status
    isSome(): boolean
    isNone(): boolean
    //endregion

    //region Testing
    equals(other: Option<A>, equality: Equivalence<Option<A>>): boolean

    test(predicate: (value: A) => boolean): boolean
    test(predicate: Predicate<A>): boolean
    test(predicate: ((value: A) => boolean)|Predicate<A>): boolean
    //endregion
}

export function option<T>(valueOrFunction: undefined | null | T | (() => T)): Option<T> {
    const nullable = valueOrFunction instanceof Function ? valueOrFunction() : valueOrFunction

    return nullable == null ? none : some(nullable)
}

export function createOptionEquality<T>(itemEquality: Equivalence<T> = guardedStrictEquality): Equivalence<Option<T>> {
    return (neitherIsUndefinedOrNull as Equivalence<Option<T>>).and(equivalence((optionX: Option<T>, optionY: Option<T>) => (
        optionX.match(
            x => optionY.match(
                y => itemEquality.test(x, y),
                () => false),
            () => false)
    )))
}