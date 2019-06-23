"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Equivalence {
    constructor(f) {
        this.f = f;
    }
    test(x, y) {
        return this.f(x, y);
    }
    get() {
        return this.f;
    }
    adapt(f) {
        return new Equivalence((x, y) => this.test(f(x), f(y)));
    }
    and(other) {
        return new Equivalence((x, y) => this.test(x, y) && other.test(x, y));
    }
    or(other) {
        return new Equivalence((x, y) => this.test(x, y) || other.test(x, y));
    }
    not() {
        return new Equivalence((x, y) => !this.test(x, y));
    }
}
exports.Equivalence = Equivalence;
exports.equivalence = (test) => new Equivalence(test);
function ensureEquivalenceFunction(equivalence) {
    return equivalence instanceof Function ? equivalence : equivalence.get();
}
exports.ensureEquivalenceFunction = ensureEquivalenceFunction;
//# sourceMappingURL=Equivalence.js.map