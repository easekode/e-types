/**
 * Common Utility Types
 */

// Make all properties optional
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Pick specific properties
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Make specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Nullable type
export type Nullable<T> = T | null;

// Optional type
export type Optional<T> = T | undefined;

// Maybe type (null or undefined)
export type Maybe<T> = T | null | undefined;

// Non-nullable type
export type NonNullable<T> = T extends null | undefined ? never : T;

// Deep partial
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep required
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Mutable (remove readonly)
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Deep mutable
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

// Get the type of array elements
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Get the return type of a function
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Get the parameters of a function
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Conditional type
export type If<C extends boolean, T, F> = C extends true ? T : F;

// String literal types (these are built-in TypeScript utility types)
// export type Uppercase<S extends string> = intrinsic;
// export type Lowercase<S extends string> = intrinsic;
// export type Capitalize<S extends string> = intrinsic;
// export type Uncapitalize<S extends string> = intrinsic;

// Template literal types
export type Join<T extends readonly string[], D extends string> = T extends readonly [
  infer F,
  ...infer R
]
  ? F extends string
    ? R extends readonly string[]
      ? `${F}${R extends readonly [] ? '' : D}${Join<R, D>}`
      : never
    : never
  : '';

// Object key types
export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[keyof T];
export type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

// Union to intersection
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Awaited type (for promises)
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// Class constructor type
export type Constructor<T = {}> = new (...args: any[]) => T;

// Abstract constructor type
export type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// Function type
export type Func<T extends readonly unknown[] = readonly unknown[], R = unknown> = (
  ...args: T
) => R;

// Async function type
export type AsyncFunc<T extends readonly unknown[] = readonly unknown[], R = unknown> = (
  ...args: T
) => Promise<R>;

// Event handler type
export type EventHandler<T = any> = (event: T) => void;

// Callback type
export type Callback<T = void> = () => T;

// Predicate type
export type Predicate<T> = (value: T) => boolean;

// Comparator type
export type Comparator<T> = (a: T, b: T) => number;

// Serializable types
export type Serializable = string | number | boolean | null | SerializableObject | SerializableArray;
export type SerializableObject = { [key: string]: Serializable };
export type SerializableArray = Serializable[];

// JSON types
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// Brand type for nominal typing
export type Brand<T, B> = T & { __brand: B };

// Opaque type
export type Opaque<T, K> = T & { readonly __opaque: K };

// Exact type
export type Exact<T, U> = T extends U ? (U extends T ? T : never) : never;

// Pretty print type (for better IDE display)
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Expand type (for better IDE display)
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Readonly deep
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

// Writable (opposite of readonly)
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Extract keys by value type
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Extract values by key type
export type ValuesOfType<T, U> = T extends Record<infer K, infer V>
  ? K extends U
    ? V
    : never
  : never;
