"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Failure_1 = require("./Failure");
class Success {
    constructor(value) {
        this.value = value;
    }
    apply(parameterOrFunction) {
        const parameter = parameterOrFunction instanceof Function ? parameterOrFunction() : parameterOrFunction;
        if (parameter instanceof Success || parameter instanceof Failure_1.Failure) {
            return parameter.chain(parameterValue => this.map(f => f(parameterValue)));
        }
        else {
            return this.map(f => f(parameter));
        }
    }
    assign(key, memberOrFunction) {
        const member = memberOrFunction instanceof Function ? memberOrFunction(this.value) : memberOrFunction;
        if (member instanceof Success || member instanceof Failure_1.Failure) {
            return member.map(memberValue => {
                return Object.assign({}, Object(this.value), { [key]: memberValue });
            });
        }
        else {
            return new Success(Object.assign({}, Object(this.value), { [key]: member }));
        }
    }
    chain(f) {
        return f(this.value);
    }
    getErrorOrElse(alternative) {
        return alternative instanceof Function ? alternative(this.value) : alternative;
    }
    getOrElse(alternative) {
        return this.value;
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    map(f) {
        return new Success(f(this.value));
    }
    mapError(f) {
        return new Success(this.value);
    }
    match(pattern) {
        return pattern.Success(this.value);
    }
    orElse(alternative) {
        return this;
    }
    orAttempt(alternative) {
        return this;
    }
    perform(sideEffect) {
        sideEffect(this.value);
        return new Success(this.value);
    }
    performOnError(sideEffect) {
        return this;
    }
}
exports.Success = Success;
function success(value) {
    return new Success(value);
}
exports.success = success;
