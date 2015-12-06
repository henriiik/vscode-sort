import * as assert from "assert";

import * as vscode from "vscode";
import {sort} from "../src/sorter";

interface TestData {
	text: string;
	sorted: string;
}

let testData: TestData[] = [
	{ text: "b c a", sorted: "a b c" }
];

suite("sort", () => {
	let separator = " ";
	let locale = "en";
	let sensitivity = "variant";

	test("words", () => {
		assert.equal("a b c", sort("c a b", separator, locale, sensitivity));
	});

	test("lines", () => {
		let separator = "\n";
		assert.equal("a\nb\nc", sort("b\nc\na", separator, locale, sensitivity));
	});

	test("reverse", () => {
		assert.equal("c b a", sort("a b c", separator, locale, sensitivity));
	});

	test("locale", () => {
		let text = "ä b a";
		let sortedSV = "a b ä";
		let localseSV = "sv";
		assert.equal(sortedSV, sort(text, separator, localseSV, sensitivity));

		let sortedDE = "a ä b";
		let localeDE = "de";
		assert.equal(sortedDE, sort(text, separator, localeDE, sensitivity));
	});

	test("case", () => {
		let text = "AA aA aa Aa";
		let sorted = "aa aA Aa AA";
		assert.equal(sorted, sort(text, separator, locale, sensitivity));

		let sensitivityIgnore = "accent";
		assert.equal(text, sort(text, separator, locale, sensitivityIgnore));
	});
});