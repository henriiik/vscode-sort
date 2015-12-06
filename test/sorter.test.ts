import * as assert from "assert";
import * as vscode from "vscode";
import {sort, makeRange} from "../src/sorter";

suite("sort()", () => {
	let separator = " ";
	let locale = "en";
	let sensitivity = "variant";

	test("should sort words", () => {
		assert.equal("a b c", sort("c a b", separator, locale, sensitivity));
	});

	test("should sort lines", () => {
		let separator = "\n";
		assert.equal("a\nb\nc", sort("b\nc\na", separator, locale, sensitivity));
	});

	test("should reverse sort ", () => {
		assert.equal("c b a", sort("a b c", separator, locale, sensitivity));
	});

	test("should sort by locale", () => {
		let text = "ä b a";
		let sortedSV = "a b ä";
		let localseSV = "sv";
		assert.equal(sortedSV, sort(text, separator, localseSV, sensitivity));

		let sortedDE = "a ä b";
		let localeDE = "de";
		assert.equal(sortedDE, sort(text, separator, localeDE, sensitivity));
	});

	test("should sort by case case", () => {
		let text = "AA aA aa Aa";
		let sorted = "aa aA Aa AA";
		assert.equal(sorted, sort(text, separator, locale, sensitivity));

		let sensitivityIgnore = "accent";
		assert.equal(text, sort(text, separator, locale, sensitivityIgnore));
	});
});

suite("makeRange()", () => {
	let start = new vscode.Position(1,1);
	let end = new vscode.Position(2,2);

	test("should expand selection", () => {
		let range = makeRange(start, end);
		assert.equal(range.start.character, 0);
		assert.equal(range.start.line, start.line);
		assert.equal(range.end.character, Number.MAX_VALUE);
		assert.equal(range.end.line, end.line);
	});

	test("should ignore empty newline", () => {
		let empty = end.with(2, 0);
		let range = makeRange(start, empty);
		assert.equal(range.end.character, Number.MAX_VALUE);
		assert.equal(range.end.line, 1);
	});
});