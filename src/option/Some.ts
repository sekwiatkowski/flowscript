import {None, none} from './None'
import {option, Option} from './Option'
import {Equivalence, fulfill, Future, Predicate, Result, success, valid, Validated} from '..'

export class Some<A> implements Option<A> {
    constructor(private readonly value: A) {}

    //region Access
    getOrElse(alternative: A|(() => A)): A {
        return this.value
    }
    //endregion

    //region Application
    apply<B, C>(this: Option<(parameter: B) => C>, argumentOrFunctionOrOption: B |(() => B) | Option<B> | (() => Option<B>)) : Option<C> {
        const argumentOrOption = argumentOrFunctionOrOption instanceof Function ? argumentOrFunctionOrOption() : argumentOrFunctionOrOption

        if (argumentOrOption instanceof Some || argumentOrOption instanceof None) {
            return argumentOrOption.chain(argument => this.map(f => f(argument)))
        }
        else {
            return this.map(f => f(<B>argumentOrOption))
        }
    }
    //endregion

    //region Chaining
    chain<B>(f: (value: A) => Option<B>): Option<B> {
        return f(this.value)
    }
    //endregion

    //region Comprehension
    assign<A extends object, K extends string, B>(
        this: Some<A>,
        key: Exclude<K, keyof A>,
        memberOptionOrValueOrFunction: Option<B> | ((value: A) => Option<B>) | B | ((value: A) => B)): Option<A & { [key in K]: B }> {

        return this.chain(scope => {
            const memberOptionOrValue = memberOptionOrValueOrFunction instanceof Function
                ? memberOptionOrValueOrFunction(scope)
                : memberOptionOrValueOrFunction

            const memberOption = (memberOptionOrValue instanceof Some || memberOptionOrValue instanceof None)
                ? memberOptionOrValue
                : option(memberOptionOrValue)

            return memberOption.map(member => ({
                ...Object(scope),
                [key]: member
            }))
        })
    }
    //endregion

    //region Conversion
    toResult<E>(error: E): Result<A, E> {
        return success(this.value)
    }

    toFuture<E>(error: E): Future<A, E> {
        return fulfill(this.value)
    }

    toValidated<E>(errorMessage: E): Validated<A, E> {
        return valid<A, E>(this.value)
    }
    //endregion

    //region Fallback
    orElse(alternative: A|(() => A)): Option<A> {
        return this
    }

    orAttempt(alternative: () => Option<A>): Option<A> {
        return this
    }
    //endregion

    //region Filtering
    filter(predicate: (value: A) => boolean): Option<A> {
        return this.test(predicate) ? this : none
    }
    //endregion

    //region Mapping
    map<B>(f: (value: A) => B): Option<B> {
        return new Some(f(this.value))
    }
    //endregion

    //region Status
    isSome(): boolean {
        return true
    }

    isNone(): boolean {
        return false
    }
    //endregion

    //region Matching
    match<B>(onSome: (value: A) => B, onNone: () => B) : B {
        return onSome(this.value)
    }
    //endregion

    //region Side-effects
    perform(sideEffect: (value: A) => void): Option<A> {
        sideEffect(this.value)
        return this
    }

    performOnBoth(sideEffect: () => void): Option<A> {
        sideEffect()
        return none
    }

    performOnNone(sideEffect: () => void): Option<A> {
        return this
    }
    //endregion

    //region Testing
    equals(other: Option<A>, equality: Equivalence<Option<A>>): boolean {
        return equality.test(this, other)
    }

    test(predicate: (value: A) => boolean): boolean
    test(predicate: Predicate<A>): boolean
    test(predicate: ((value: A) => boolean)|Predicate<A>): boolean {
        if (predicate instanceof Function) {
            return predicate(this.value)
        }
        else {
            return predicate.test(this.value)
        }
    }
    //endregion
}


export function some<A>(value: A): Some<A> {
    return new Some(value)
}

export function optionObject() : Option<{}> {
    return some({})
}