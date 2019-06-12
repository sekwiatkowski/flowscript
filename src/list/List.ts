import {Future, none, Option, some} from '..'
import {ArrayConcatenation, Max, Min, Monoid, Product, Sum} from '../monoids/Monoids'
import {
    allItems,
    appendItem,
    containsItem,
    countItems,
    equalItems,
    filterItems,
    findItem,
    findLastItem,
    flatten,
    foldItemsBy,
    forEachItem,
    getItem,
    getItemOrElse,
    groupItemsBy,
    mapItems,
    noItems,
    parallelMapItems,
    prependItem,
    rangeOfItems,
    repeatItems,
    someItem,
    sortItems,
    sortItemsBy,
    sortItemsDescendingly,
    sortItemsDescendinglyBy,
    takeItems
} from './ArrayFunctions'
import {NonEmptyList} from './NonEmptyList'

export class List<T> {
    private readonly length: number
    constructor(private readonly items: T[]) {
        this.length = items.length
    }

    //region Access
    first(): Option<T> {
        return getItem(this.items, 0)
    }

    get(index: number): Option<T> {
        return getItem(this.items, index)
    }

    getArray(): T[] {
        return this.items
    }

    getOrElse(index: number, alternative: T|(() => T)): T {
        return getItemOrElse(this.items, index, alternative)
    }

    last(): Option<T> {
        return getItem(this.items, this.length - 1)
    }

    take(n: number): List<T> {
        return new List(takeItems(this.items, n))
    }
    //endregion

    //region Chaining
    flatten<U>(this: List<List<U>|U[]>): List<U> {
        return new List(flatten(this.items))
    }

    chain(f: (T) => List<T>): List<T> {
        return this.map(f).flatten()
    }
    //endregion

    //region Combination
    concat(otherList: List<T>): List<T> {
        return new List(ArrayConcatenation.combine(this.items)(otherList.items))
    }
    //endregion

    //region Expansion
    append(item: T): NonEmptyList<T> {
        return new NonEmptyList(appendItem(this.items, item))
    }

    prepend(item: T): NonEmptyList<T> {
        return new NonEmptyList(prependItem(this.items, item))
    }
    //endregion

    //region Filtering
    filter(predicate: (item: T) => boolean): List<T> {
        return new List(filterItems(this.items, predicate))
    }
    //endregion

    //region Folding
    foldBy<U>(by: (item: T) => U, operation: (a: U) => (b: U) => U, initialValue: U): Option<U> {
        if (this.length == 0) {
            return none
        }
        else {
            return some(foldItemsBy(this.items, by, operation, initialValue))
        }
    }

    fold(operation: (a: T) => (b: T) => T, initialValue: T): Option<T> {
        return this.foldBy(x => x, operation, initialValue)
    }

    foldWithMonoid(monoid: Monoid<T>): Option<T> {
        return this.fold(monoid.combine, monoid.identityElement)
    }

    foldByWithMonoid<U>(by: (item: T) => U, monoid: Monoid<U>): Option<U> {
        return this.foldBy(by, monoid.combine, monoid.identityElement)
    }

    max(this: List<number>): Option<number> {
        return this.foldWithMonoid(Max)
    }

    maxBy(by: (item: T) => number): Option<number> {
        return this.foldByWithMonoid(by, Max)
    }

    min(this: List<number>): Option<number> {
        return this.foldWithMonoid(Min)
    }

    minBy(by: (item: T) => number): Option<number> {
        return this.foldByWithMonoid(by, Min)
    }

    sum(this: List<number>): Option<number> {
        return this.foldWithMonoid(Sum)
    }

    sumBy(by: (item: T) => number): Option<number> {
        return this.foldByWithMonoid(by, Sum)
    }

    product(this: List<number>): Option<number> {
        return this.foldWithMonoid(Product)
    }

    productBy(by: (item: T) => number): Option<number> {
        return this.foldByWithMonoid(by, Product)
    }
    //endregion

    //region Grouping
    groupBy(computeKey: (item: T) => string): { [id: string]: T[] } {
        return groupItemsBy(this.items, computeKey)
    }
    //endregion

    //region Mapping
    map<U>(f: (item: T) => U): List<U> {
        return new List(mapItems(this.items, f))
    }

    parallelMap<U, E>(f: (item: T) => U): Future<U[], E> {
        return parallelMapItems(this.items, f)
    }
    //endregion

    //region Matching
    match<X>(
        onNonEmpty: (array: T[]) => X,
        onEmpty: () => X) : X {
        return this.length == 0 ? onEmpty() : onNonEmpty(this.items)
    }
    //endregion

    //region Search
    find(predicate: (item: T) => boolean): Option<T>{
        return findItem(this.items, predicate)
    }

    findLast(predicate?: (item: T) => boolean): Option<T> {
        return findLastItem(this.items, predicate)
    }
    //endregion

    //region Side-effects
    perform(sideEffect: (list: List<T>) => void) {
        sideEffect(this)
    }

    performOnEmpty(sideEffect: (list: List<T>) => void) {
        if (this.length > 0) {
            return
        }

        sideEffect(this)
    }

    performOnNonEmpty(sideEffect: (list: List<T>) => void) {
        if (this.length == 0) {
            return
        }

        sideEffect(this)
    }

    forEach(sideEffect: (item: T) => void) {
        forEachItem(this.items, sideEffect)
    }
    //endregion

    //region Status
    size(): number {
        return this.length
    }

    isEmpty(): boolean {
        return this.length === 0
    }

    isNotEmpty(): boolean {
        return this.length > 0
    }
    //endregion

    //region Sorting
    sort(): List<T> {
        return new List(sortItems(this.items))
    }

    sortBy<U>(by: (item: T) => U): List<T> {
        return new List(sortItemsBy(this.items, by))
    }

    sortDescendingly(): List<T> {
        return new List(sortItemsDescendingly(this.items))
    }

    sortDescendinglyBy<U>(by: (item: T) => U): List<T> {
        return new List(sortItemsDescendinglyBy(this.items, by))
    }
    //endregion

    //region Testing
    contains(item: T): boolean {
        return containsItem(this.items, item)
    }

    equals(otherList: List<T>): boolean {
        if (otherList == null) {
            return false
        }

        return equalItems(this.items, otherList.getArray())
    }

    all(predicate: (item: T) => boolean): boolean {
        return allItems(this.items, predicate)
    }

    some(predicate: (item: T) => boolean): boolean {
        return someItem(this.items, predicate)
    }

    none(predicate: (item: T) => boolean): boolean {
        return noItems(this.items, predicate)
    }

    count(predicate: (item: T) => boolean): number {
        return countItems(this.items, predicate)
    }
    //endregion
}

export function list<T>(...items: T[]): List<T> {
    return new List(items)
}

export function emptyList<T>(): List<T> {
    return list()
}

export function listFromArray<T>(array: T[]): List<T> {
    return list(...array)
}

export function range(start: number, end?: number): List<number> {
    return listFromArray(rangeOfItems(start, end))
}

export function repeat<T>(times: number, valueOrFunction: T|((index?: number) => T)): List<T> {
    return listFromArray(repeatItems(times, valueOrFunction))
}