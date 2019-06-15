"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Equality_1 = require("../equivalence/Equality");
class Lazy {
    constructor(lazyValue) {
        this.lazyValue = lazyValue;
    }
    //region Access
    get() {
        return this.lazyValue;
    }
    //endregion
    //region Application
    apply(argumentOrFunction) {
        return new Lazy(() => {
            const argumentOrLazy = argumentOrFunction instanceof Function ? argumentOrFunction() : argumentOrFunction;
            const argument = argumentOrLazy instanceof Lazy ? argumentOrLazy.run() : argumentOrLazy;
            return this.lazyValue()(argument);
        });
    }
    //endregion
    //region Chaining
    chain(f) {
        return new Lazy(() => f(this.run()).run());
    }
    //endregion
    //region Comprehension
    assign(key, memberOrLazyOrFunction) {
        return this.map(scope => {
            const memberOrLazy = memberOrLazyOrFunction instanceof Function ? memberOrLazyOrFunction(scope) : memberOrLazyOrFunction;
            const member = memberOrLazy instanceof Lazy ? memberOrLazy.run() : memberOrLazy;
            return Object.assign({}, Object(scope), { [key]: member });
        });
    }
    //endregion
    //region Execution
    run() {
        return this.lazyValue();
    }
    //endregion
    //region Mapping
    map(f) {
        return new Lazy(() => f(this.lazyValue()));
    }
    //endregion Mapping
    //region Side-effects
    perform(sideEffect) {
        return new Lazy(() => {
            const value = this.lazyValue();
            sideEffect(value);
            return value;
        });
    }
    //endregion
    //region Testing
    equals(otherLazy, equality) {
        return (equality || LazyEquality).test(this, otherLazy);
    }
    test(predicate) {
        if (predicate instanceof Function) {
            return predicate(this.run());
        }
        else {
            return predicate.test(this.run());
        }
    }
}
exports.Lazy = Lazy;
function lazy(f) {
    return new Lazy(f);
}
exports.lazy = lazy;
function lazyObject() {
    return new Lazy(() => ({}));
}
exports.lazyObject = lazyObject;
const LazyEquality = Equality_1.neitherIsUndefinedOrNull.and(Equality_1.strictEquality.adapt(lazy => lazy.get()));
//# sourceMappingURL=Lazy.js.map