// type FindSantaInOneDimensionalArray<T extends string[]> = {
//   [K in keyof T]: T[K] extends '🎅🏼' ? K : never;
// }[number];

// type ConvertStringToNumber<T> = T extends `${infer A extends number}` ? A : never;

// type FindSanta<T extends string[][]> = Exclude<
//   {
//     [K in keyof T]: [
//       ConvertStringToNumber<K>,
//       ConvertStringToNumber<FindSantaInOneDimensionalArray<T[K]>>,
//     ];
//   }[number],
//   [number, never]
// >;

type FindSantaSingle<Forest extends any[]> = {
	[k in keyof Forest]: Forest[k] extends `🎅🏼`
		? k extends `${infer N extends number}`
			? N
			: never
		: never;
}[number];

type FindSanta<Forest extends any[]> = {
	[k in keyof Forest]: FindSantaSingle<Forest[k]> extends never
		? never
		: [ToNumber<k>, FindSantaSingle<Forest[k]>];
}[number];

type ToNumber<T> = T extends `${infer N extends number}` ? N : never;


/************************** TESTS **************************/
import { Equal, Expect } from 'type-testing';

type Forest0 = [
  ['🎅🏼', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_0_actual = FindSanta<Forest0>;
//   ^?
type test_0_expected = [0, 0];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type Forest1 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎅🏼', '🎄', '🎄'],
];
type test_1_actual = FindSanta<Forest1>;
//   ^?
type test_1_expected = [3, 1];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type Forest2 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎅🏼', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_2_actual = FindSanta<Forest2>;
//   ^?
type test_2_expected = [2, 2];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type Forest3 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎅🏼', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_3_actual = FindSanta<Forest3>;
//   ^?
type test_3_expected = [2, 1];
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type Forest4 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎅🏼', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_4_actual = FindSanta<Forest4>;
//   ^?
type test_4_expected = [1, 2];
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;
