"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Failure_1 = require("./Failure");
const __1 = require("..");
class Success {
    constructor(value) {
        this.value = value;
    }
    //region Access
    getErrorOrElse(alternative) {
        return alternative instanceof Function ? alternative(this.value) : alternative;
    }
    getOrElse(alternative) {
        return this.value;
    }
    //endregion
    //region Application
    apply(argumentOrFunctionOrResult) {
        const argumentOrResult = argumentOrFunctionOrResult instanceof Function ? argumentOrFunctionOrResult() : argumentOrFunctionOrResult;
        if (argumentOrResult instanceof Success || argumentOrResult instanceof Failure_1.Failure) {
            return argumentOrResult.chain(argument => this.map(f => f(argument)));
        }
        else {
            return this.map(f => f(argumentOrResult));
        }
    }
    //endregion
    //region Chaining
    chain(f) {
        return f(this.value);
    }
    //endregion
    //region Comprehension
    assign(key, memberResultOrValueOrFunction) {
        return this.chain(scope => {
            const memberResultOrValue = memberResultOrValueOrFunction instanceof Function
                ? memberResultOrValueOrFunction(this.value)
                : memberResultOrValueOrFunction;
            const memberResult = (memberResultOrValue instanceof Success || memberResultOrValue instanceof Failure_1.Failure)
                ? memberResultOrValue
                : success(memberResultOrValue);
            return memberResult.map(map => (Object.assign({}, Object(scope), { [key]: map })));
        });
    }
    //endregion
    //region Conversion
    toFuture() {
        return __1.fulfill(this.value);
    }
    toOption() {
        return __1.some(this.value);
    }
    toValidated() {
        return __1.valid(this.value);
    }
    //endregion
    //region Fallback
    orElse(alternative) {
        return this;
    }
    orAttempt(alternative) {
        return this;
    }
    //endregion
    //region Mapping
    map(f) {
        return new Success(f(this.value));
    }
    mapError(f) {
        return new Success(this.value);
    }
    //endregion
    //region Matching
    match(onSuccess, onFailure) {
        return onSuccess(this.value);
    }
    //endregion
    //region Side-effects
    performOnBoth(sideEffect) {
        sideEffect();
        return this;
    }
    perform(sideEffect) {
        sideEffect(this.value);
        return this;
    }
    performOnFailure(sideEffect) {
        return this;
    }
    //endregion
    //region Status
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    //endregion
    //region Testing
    equals(otherResult, equality) {
        return equality.test(this, otherResult);
    }
    test(predicate) {
        if (predicate instanceof Function) {
            return predicate(this.value);
        }
        else {
            return predicate.test(this.value);
        }
    }
}
exports.Success = Success;
function success(value) {
    return new Success(value);
}
exports.success = success;
function resultObject() {
    return success({});
}
exports.resultObject = resultObject;
//# sourceMappingURL=Success.js.map