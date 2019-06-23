"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//region Testing
var Equivalence_1 = require("./equivalence/Equivalence");
exports.ensureEquivalenceFunction = Equivalence_1.ensureEquivalenceFunction;
exports.Equivalence = Equivalence_1.Equivalence;
exports.equivalence = Equivalence_1.equivalence;
var ObjectEquivalence_1 = require("./equivalence/ObjectEquivalence");
exports.objectEquivalence = ObjectEquivalence_1.objectEquivalence;
var Equality_1 = require("./equivalence/Equality");
exports.neitherIsUndefinedOrNull = Equality_1.neitherIsUndefinedOrNull;
exports.guardedStrictEquality = Equality_1.guardedStrictEquality;
exports.bothAreNull = Equality_1.bothAreNull;
exports.nullableStrictEquality = Equality_1.nullableStrictEquality;
exports.NullableStringEquality = Equality_1.NullableStringEquality;
exports.NullableNumberEquality = Equality_1.NullableNumberEquality;
exports.NullableBooleanEquality = Equality_1.NullableBooleanEquality;
exports.NullableDateEquality = Equality_1.NullableDateEquality;
exports.StringEquality = Equality_1.StringEquality;
exports.NumberEquality = Equality_1.NumberEquality;
exports.BooleanEquality = Equality_1.BooleanEquality;
exports.DateEquality = Equality_1.DateEquality;
var ArrayEquality_1 = require("./list/ArrayEquality");
exports.createArrayEquality = ArrayEquality_1.createArrayEquality;
exports.NullableStringArrayEquality = ArrayEquality_1.NullableStringArrayEquality;
exports.NullableNumberArrayEquality = ArrayEquality_1.NullableNumberArrayEquality;
exports.NullableBooleanArrayEquality = ArrayEquality_1.NullableBooleanArrayEquality;
exports.NullableDateArrayEquality = ArrayEquality_1.NullableDateArrayEquality;
exports.StringArrayEquality = ArrayEquality_1.StringArrayEquality;
exports.NumberArrayEquality = ArrayEquality_1.NumberArrayEquality;
exports.BooleanArrayEquality = ArrayEquality_1.BooleanArrayEquality;
exports.DateArrayEquality = ArrayEquality_1.DateArrayEquality;
var Order_1 = require("./order/Order");
exports.Order = Order_1.Order;
exports.order = Order_1.order;
exports.orderBy = Order_1.orderBy;
exports.orderDescendinglyBy = Order_1.orderDescendinglyBy;
exports.AnyOrder = Order_1.AnyOrder;
exports.DescendingAnyOrder = Order_1.DescendingAnyOrder;
exports.StringOrder = Order_1.StringOrder;
exports.NumberOrder = Order_1.NumberOrder;
exports.BooleanOrder = Order_1.BooleanOrder;
exports.DateOrder = Order_1.DateOrder;
exports.DescendingStringOrder = Order_1.DescendingStringOrder;
exports.DescendingNumberOrder = Order_1.DescendingNumberOrder;
exports.DescendingBooleanOrder = Order_1.DescendingBooleanOrder;
exports.DescendingDateOrder = Order_1.DescendingDateOrder;
var Predicate_1 = require("./predicate/Predicate");
exports.ensurePredicateFunction = Predicate_1.ensurePredicateFunction;
exports.Predicate = Predicate_1.Predicate;
exports.predicate = Predicate_1.predicate;
var ObjectCombination_1 = require("./combination/ObjectCombination");
exports.objectCombination = ObjectCombination_1.objectCombination;
var Monoid_1 = require("./combination/Monoid");
exports.Any = Monoid_1.Any;
exports.All = Monoid_1.All;
exports.Latest = Monoid_1.Latest;
exports.Max = Monoid_1.Max;
exports.Earliest = Monoid_1.Earliest;
exports.Min = Monoid_1.Min;
exports.Sum = Monoid_1.Sum;
exports.Product = Monoid_1.Product;
exports.ArrayConcatenation = Monoid_1.ArrayConcatenation;
//endregion
//region Computation
var Box_1 = require("./box/Box");
exports.Box = Box_1.Box;
exports.box = Box_1.box;
exports.boxObject = Box_1.boxObject;
exports.createBoxEquality = Box_1.createBoxEquality;
var Pair_1 = require("./pair/Pair");
exports.Pair = Pair_1.Pair;
exports.pair = Pair_1.pair;
exports.createPairEquality = Pair_1.createPairEquality;
var List_1 = require("./list/List");
exports.emptyList = List_1.emptyList;
exports.List = List_1.List;
exports.listFromArray = List_1.listFromArray;
exports.range = List_1.range;
exports.repeat = List_1.repeat;
exports.createListEquality = List_1.createListEquality;
var NonEmptyList_1 = require("./list/NonEmptyList");
exports.inclusiveRange = NonEmptyList_1.inclusiveRange;
exports.list = NonEmptyList_1.list;
exports.NonEmptyList = NonEmptyList_1.NonEmptyList;
exports.createNonEmptyListEquality = NonEmptyList_1.createNonEmptyListEquality;
var Option_1 = require("./option/Option");
exports.option = Option_1.option;
exports.createOptionEquality = Option_1.createOptionEquality;
var Some_1 = require("./option/Some");
exports.Some = Some_1.Some;
exports.some = Some_1.some;
exports.optionObject = Some_1.optionObject;
var None_1 = require("./option/None");
exports.None = None_1.None;
exports.none = None_1.none;
var Result_1 = require("./result/Result");
exports.createResultEquality = Result_1.createResultEquality;
var Success_1 = require("./result/Success");
exports.Success = Success_1.Success;
exports.success = Success_1.success;
exports.resultObject = Success_1.resultObject;
var Failure_1 = require("./result/Failure");
exports.Failure = Failure_1.Failure;
exports.failure = Failure_1.failure;
var Validated_1 = require("./validated/Validated");
exports.createValidatedEquality = Validated_1.createValidatedEquality;
var Valid_1 = require("./validated/Valid");
exports.Valid = Valid_1.Valid;
exports.valid = Valid_1.valid;
exports.validatedObject = Valid_1.validatedObject;
var Invalid_1 = require("./validated/Invalid");
exports.Invalid = Invalid_1.Invalid;
exports.invalid = Invalid_1.invalid;
var Future_1 = require("./future/Future");
exports.Future = Future_1.Future;
exports.future = Future_1.future;
exports.fulfill = Future_1.fulfill;
exports.reject = Future_1.reject;
exports.futureObject = Future_1.futureObject;
var Settled_1 = require("./future/Settled");
exports.createSettledEquality = Settled_1.createSettledEquality;
var State_1 = require("./state/State");
exports.State = State_1.State;
exports.state = State_1.state;
exports.stateObject = State_1.stateObject;
var Writer_1 = require("./writer/Writer");
exports.Writer = Writer_1.Writer;
exports.writer = Writer_1.writer;
exports.stringWriter = Writer_1.stringWriter;
exports.listWriter = Writer_1.listWriter;
exports.createWriterEquality = Writer_1.createWriterEquality;
var Program_1 = require("./program/Program");
exports.Program = Program_1.Program;
exports.program = Program_1.program;
//endregion
//region Functions
var Action_1 = require("./action/Action");
exports.Action = Action_1.Action;
exports.action = Action_1.action;
var Arrow_1 = require("./arrow/Arrow");
exports.Arrow = Arrow_1.Arrow;
exports.arrow = Arrow_1.arrow;
var Identity_1 = require("./functions/Identity");
exports.identity = Identity_1.identity;
//endregion
//# sourceMappingURL=index.js.map