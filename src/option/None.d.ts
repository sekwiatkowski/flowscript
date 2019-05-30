import { Option, OptionMatchPattern } from './Option';
export declare class None<A> implements Option<A> {
    static value: Option<never>;
    private constructor();
    apply<B, C>(this: Option<(parameter: B) => C>, parameterOrFunction: B | (() => B) | Option<B> | (() => Option<B>)): Option<C>;
    assign<A extends object, B>(this: None<A>, key: string, member: B | ((value: A) => B) | Option<B> | ((value: A) => Option<B>)): Option<A & {
        [k in string]: B;
    }>;
    chain<B>(f: (a: A) => Option<B>): Option<B>;
    test(predicate: (value: A) => boolean): boolean;
    filter(predicate: (value: A) => boolean): Option<A>;
    getOrElse(alternative: A | (() => A)): A;
    isSome(): boolean;
    isNone(): boolean;
    map<B>(f: (value: A) => B): Option<B>;
    match<B>(pattern: OptionMatchPattern<A, B>): B;
    orElse(alternative: A | (() => A)): Option<A>;
    orAttempt(alternative: () => Option<A>): Option<A>;
    perform(sideEffect: (value: A) => void): Option<A>;
    performWhenNone(sideEffect: () => void): Option<A>;
}
export declare const none: Option<never>;
