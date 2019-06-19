import { Pair } from '..';
export declare class State<S, A> {
    private readonly f;
    constructor(f: (state: S) => Pair<S, A>);
    get(): (state: S) => Pair<S, A>;
    chain<B>(g: (current: A) => State<S, B>): State<S, B>;
    runWith(state: S): Pair<S, A>;
    evaluateWith(state: S): A;
    assign<S, A extends object, B, K extends string>(this: State<S, A>, key: K, memberOrStateOrFunction: (State<S, B> | ((scope: A) => State<S, B>)) | B | ((scope: A) => B)): State<S, A & {
        [key in K]: B;
    }>;
    map<B>(f: (current: A) => B): State<S, B>;
    perform(sideEffect: (resultant: A) => void): State<S, A>;
}
export declare function state<S, A>(f: (state: S) => Pair<S, A>): State<S, A>;
export declare function stateObject<S>(): State<S, object>;
