﻿interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): Map<K, V>;
    size: number;
}
interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}
declare var Map: MapConstructor;
interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): IterableIterator<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): IterableIterator<T>;
    size: number;
    values(): IterableIterator<T>;
    [Symbol.iterator](): IterableIterator<T>;
    [Symbol.toStringTag]: string;
}

interface SetConstructor {
    new (): Set<any>;
    new <T>(): Set<T>;
    new <T>(iterable: Iterable<T>): Set<T>;
    prototype: Set<any>;
}
declare var Set: SetConstructor;

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch(onrejected?: (reason: any) => T | PromiseLike<T>): Promise<T>;
    catch(onrejected?: (reason: any) => void): Promise<T>;

    [Symbol.toStringTag]: string;
}

interface PromiseConstructor {
    /** 
      * A reference to the prototype. 
      */
    prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments: 
     * a resolve callback used resolve the promise with a value or the result of another promise, 
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises 
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved 
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject(reason: any): Promise<void>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T>(reason: any): Promise<T>;

    /**
      * Creates a new resolved promise for the provided value.
      * @param value A promise.
      * @returns A promise whose internal state matches the provided promise.
      */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;

    [Symbol.species]: Function;
}

declare var Promise: PromiseConstructor;
interface IteratorResult<T> {
    done: boolean;
    value?: T;
}
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    [Symbol.toStringTag]: string;
}

interface SymbolConstructor {
    /** 
      * A reference to the prototype. 
      */
    prototype: Symbol;

    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    (description?: string | number): symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found. 
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found. 
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: symbol): string;

    // Well-known Symbols

    /** 
      * A method that determines if a constructor object recognizes an object as one of the 
      * constructor’s instances. Called by the semantics of the instanceof operator. 
      */
    hasInstance: symbol;

    /** 
      * A Boolean value that if true indicates that an object should flatten to its array elements
      * by Array.prototype.concat.
      */
    isConcatSpreadable: symbol;

    /** 
      * A method that returns the default iterator for an object. Called by the semantics of the 
      * for-of statement.
      */
    iterator: symbol;

    /**
      * A regular expression method that matches the regular expression against a string. Called 
      * by the String.prototype.match method. 
      */
    match: symbol;

    /** 
      * A regular expression method that replaces matched substrings of a string. Called by the 
      * String.prototype.replace method.
      */
    replace: symbol;

    /**
      * A regular expression method that returns the index within a string that matches the 
      * regular expression. Called by the String.prototype.search method.
      */
    search: symbol;

    /** 
      * A function valued property that is the constructor function that is used to create 
      * derived objects.
      */
    species: symbol;

    /**
      * A regular expression method that splits a string at the indices that match the regular 
      * expression. Called by the String.prototype.split method.
      */
    split: symbol;

    /** 
      * A method that converts an object to a corresponding primitive value.
      * Called by the ToPrimitive abstract operation.
      */
    toPrimitive: symbol;

    /** 
      * A String value that is used in the creation of the default string description of an object.
      * Called by the built-in method Object.prototype.toString.
      */
    toStringTag: symbol;

    /**
      * An Object whose own property names are property names that are excluded from the 'with'
      * environment bindings of the associated objects.
      */
    unscopables: symbol;
}
declare var Symbol: SymbolConstructor;