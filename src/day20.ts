type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type ValidChars = Uppercase<keyof Letters> | Lowercase<keyof Letters>;

type ProcessLine<
	Line extends string,
	Acc1 extends string = "",
	Acc2 extends string = "",
	Acc3 extends string = "",
> = Line extends `${infer First}${infer Rest}`
	? First extends ValidChars
		? ProcessLine<
				Rest,
				`${Acc1}${Letters[Uppercase<First>][0]}`,
				`${Acc2}${Letters[Uppercase<First>][1]}`,
				`${Acc3}${Letters[Uppercase<First>][2]}`
			>
		: [Acc1, Acc2, Acc3]
	: [Acc1, Acc2, Acc3];

type ToAsciiArt<
	Msg extends string,
	Acc extends any[] = [],
> = Msg extends `${infer First}\n${infer Rest}`
	? ToAsciiArt<Rest, [...Acc, ...ProcessLine<First>]>
	: [...Acc, ...ProcessLine<Msg>];


/************************** TESTS **************************/
import { Equal, Expect } from 'type-testing';

type test_0_actual = ToAsciiArt<'   * : * Merry * : *   \n  Christmas  '>;
//   ^?
type test_0_expected = [
  '░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░',
  '░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░',
  '░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░',
  '░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░',
  '░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░',
  '░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░',
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<'  Happy new  \n  * : * : * Year * : * : *  '>;
//   ^?
type test_1_expected = [
  '░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░',
  '░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░',
  '░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░',
  '░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░',
  '░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░',
  '░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░',
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<'  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * '>;
//   ^?
type test_2_expected = [
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░',
  '░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░',
  '░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual =
  ToAsciiArt<'  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : '>;
//   ^?
type test_3_expected = [
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░',
  '░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░',
  '░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;
