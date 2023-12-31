// type ArrayOfLength<
//   TType extends unknown,
//   TLength extends number,
//   TArray extends TType[] = [],
// > = TArray['length'] extends TLength ? TArray : ArrayOfLength<TType, TLength, [TType, ...TArray]>;

// type Add<N1 extends number, N2 extends number> = [
//   ...ArrayOfLength<unknown, N1>,
//   ...ArrayOfLength<unknown, N2>,
// ]['length'] &
//   number;

// type Symbols = ['🛹', '🚲', '🛴', '🏄'];
// type Rebuild<
//   TNumbersList extends number[],
//   TSymbolIndex extends number = 0,
// > = TNumbersList extends [infer TNumber extends number, ...infer TRest extends number[]]
//   ? [
//       ...ArrayOfLength<Symbols[TSymbolIndex], TNumber>,
//       ...Rebuild<TRest, TSymbolIndex extends 3 ? 0 : Add<TSymbolIndex, 1>>,
//     ]
//   : [];

type IndexToEmoji<V extends string> = V extends "0" | "4"
	? "🛹"
	: V extends "1" | "5"
		? "🚲"
		: V extends "2" | "6"
			? "🛴"
			: V extends "3" | "7"
				? "🏄"
				: "";

type MapValues<N extends any, V, Acc extends any[] = []> = Acc extends { length: N }
	? Acc
	: MapValues<N, V, [IndexToEmoji<V & string>, ...Acc]>;

type Flatten<Values extends any[], Acc extends any[] = []> = Values extends [
	infer First,
	...infer Rest,
]
	? First extends any[]
		? Flatten<Rest, [...Acc, ...First]>
		: []
	: Acc;

type Rebuild<Values extends any[]> = Flatten<{
	[k in keyof Values]: MapValues<Values[k], k>;
}>;


/************************** TESTS **************************/
import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = [
  '🛹',
  '🛹',
  '🚲',
  '🛴',
  '🛴',
  '🛴',
  '🏄',
  '🏄',
  '🏄',
  '🛹',
  '🚲',
  '🛴',
  '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
  '🛹',
  '🛹',
  '🛹',
  '🚲',
  '🚲',
  '🚲',
  '🛴',
  '🛴',
  '🏄',
  '🛹',
  '🛹',
  '🚲',
  '🛴',
  '🛴',
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
  '🛹',
  '🛹',
  '🚲',
  '🚲',
  '🚲',
  '🛴',
  '🛴',
  '🛴',
  '🏄',
  '🏄',
  '🏄',
  '🏄',
  '🏄',
  '🛹',
  '🚲',
  '🛴',
  '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
