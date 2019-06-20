//region Testing
export { ensureEquivalenceFunction, Equivalence, equivalence } from './equivalence/Equivalence'
export { objectEquivalence } from './equivalence/ObjectEquivalence'

export {
    neitherIsUndefinedOrNull, guardedStrictEquality, bothAreNull, nullableStrictEquality,
    NullableStringEquality, NullableNumberEquality, NullableBooleanEquality, NullableDateEquality,
    StringEquality, NumberEquality, BooleanEquality, DateEquality
} from './equivalence/Equality'

export {
    createArrayEquality,
    NullableStringArrayEquality, NullableNumberArrayEquality, NullableBooleanArrayEquality, NullableDateArrayEquality,
    StringArrayEquality, NumberArrayEquality, BooleanArrayEquality, DateArrayEquality
} from './list/ArrayEquality'

export {
    Order, order, Ordering,
    orderBy, orderDescendinglyBy,
    AnyOrder, DescendingAnyOrder,
    StringOrder, NumberOrder, BooleanOrder, DateOrder,
    DescendingStringOrder, DescendingNumberOrder, DescendingBooleanOrder, DescendingDateOrder } from './order/Order'

export { ensurePredicateFunction, Predicate, predicate } from './predicate/Predicate'
//endregion

//region Combination
export { Semigroup } from './combination/Semigroup'
export { objectCombination } from './combination/ObjectCombination'

export { Monoid, Any, All, Latest, Max, Earliest, Min, Sum, Product, ArrayConcatenation } from './combination/Monoid'
//endregion

//region Computation
export { Box, box, boxObject } from './box/Box'
export { Pair, pair } from './pair/Pair'

export { Program, program } from './program/Program'

export { Option, option } from './option/Option'
export { Some, some, optionObject } from './option/Some'
export { None, none } from './option/None'

export { Result } from './result/Result'
export { Success, success, resultObject } from './result/Success'
export { Failure, failure } from './result/Failure'

export { Validated } from './validated/Validated'
export { Valid, valid, validatedObject } from './validated/Valid'
export { Invalid, invalid } from './validated/Invalid'

export { Future, future, fulfill, reject, futureObject } from './future/Future'

export { emptyList, List, listFromArray, range, repeat } from './list/List'
export { inclusiveRange, list, NonEmptyList } from './list/NonEmptyList'

export { State, state, stateObject } from './state/State'

export { Writer, writer } from './writer/Writer'
//endregion

//region Functions
export { Action, action } from './action/Action'
export { Arrow, arrow } from './arrow/Arrow'
//endregion