"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rejected {
    constructor(error) {
        this.error = error;
    }
    getErrorOrElse(alternative) {
        return this.error;
    }
    getOrElse(alternative) {
        return alternative instanceof Function ? alternative(this.error) : alternative;
    }
    fold(onFulfilled, onRejected) {
        return onRejected(this.error);
    }
    map(f) {
        return new Rejected(this.error);
    }
    mapError(f) {
        return new Rejected(f(this.error));
    }
    perform(sideEffect) {
        sideEffect();
        return this;
    }
    performOnFulfilled(sideEffect) {
        return this;
    }
    performOnRejected(sideEffect) {
        sideEffect(this.error);
        return this;
    }
    run(whenFulfilled, whenRejected) {
        whenRejected(this.error);
    }
}
function rejected(error) {
    return new Rejected(error);
}
exports.rejected = rejected;
//# sourceMappingURL=Rejected.js.map