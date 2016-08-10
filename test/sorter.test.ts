import * as assert from "assert";
import * as vscode from "vscode";
import {sort, makeRange} from "../src/sorter";

suite("sort()", () => {
    function testSeparator(s: string, name: string) {
        let locale = "en";

        test(`should sort ${name}`, () => {
            assert.equal(`a${s}b${s}c`, sort(`b${s}c${s}a`, s, locale, false));
        });

        test(`should sort ${name} with trailing whitespace`, () => {
            assert.equal(`a${s}b${s}c${s}`, sort(`b${s}c${s}a${s}`, s, locale, false));
        });

        test(`should sort ${name} with leading whitespace`, () => {
            assert.equal(`${s}a${s}b${s}c`, sort(`${s}b${s}c${s}a`, s, locale, false));
        });

        test(`should sort ${name} with trailing and leading whitespace`, () => {
            assert.equal(`${s}a${s}b${s}c${s}`, sort(`${s}b${s}c${s}a${s}`, s, locale, false));
        });

        test(`should reverse sort ${name}`, () => {
            assert.equal(`c${s}b${s}a`, sort(`a${s}b${s}c`, s, locale, false));
        });

        test(`should sort comma separated ${name}`, () => {
            assert.equal(`a,${s}b,${s}c`, sort(`c,${s}a,${s}b`, s, locale, false));
        });

        test(`should sort comma separated ${name} with trailing whitespace`, () => {
            assert.equal(`a,${s}b,${s}c${s}`, sort(`b,${s}c,${s}a${s}`, s, locale, false));
        });

        test(`should sort comma separated ${name} with leading whitespace`, () => {
            assert.equal(`${s}a,${s}b,${s}c`, sort(`${s}b,${s}c,${s}a`, s, locale, false));
        });

        test(`should sort comma separated ${name} with trailing and leading whitespace`, () => {
            assert.equal(`${s}a,${s}b,${s}c,${s}`, sort(`${s}b,${s}c,${s}a,${s}`, s, locale, false));
        });

        test(`should reverse sort comma separated ${name}`, () => {
            assert.equal(`c,${s}b,${s}a`, sort(`a,${s}b,${s}c`, s, locale, false));
        });

        test(`should sort comma separated ${name} with trailing comma`, () => {
            assert.equal(`a,${s}b,${s}c,`, sort(`c,${s}a,${s}b,`, s, locale, false));
        });

        test(`should reverse sort comma separated ${name}`, () => {
            assert.equal(`c,${s}b,${s}a,`, sort(`a,${s}b,${s}c,`, s, locale, false));
        });

        test(`should sort ${name} by locale`, () => {
            let text = `ä${s}b${s}a`;
            let sortedSV = `a${s}b${s}ä`;
            let localseSV = `sv`;
            assert.equal(sortedSV, sort(text, s, localseSV, false));

            let sortedDE = `a${s}ä${s}b`;
            let localeDE = "de";
            assert.equal(sortedDE, sort(text, s, localeDE, false));
        });

        test(`should sort ${name} by case`, () => {
            let text = `AA${s}aA${s}aa${s}Aa`;
            let sorted = `aa${s}aA${s}Aa${s}AA`;
            assert.equal(sorted, sort(text, s, locale, false));

            let reversed = `Aa${s}aa${s}aA${s}AA`;
            assert.equal(reversed, sort(text, s, locale, true));
        });
    }

    testSeparator(" ", "words");

    testSeparator("\n", "LF lines");

    testSeparator("\r\n", "CRLF lines");
});

// suite("makeRange()", () => {
//     let start = new vscode.Position(1, 1);
//     let end = new vscode.Position(2, 2);

//     test("should expand selection", () => {
//         let range = makeRange(start, end);
//         assert.equal(range.start.character, 0);
//         assert.equal(range.start.line, start.line);
//         assert.equal(range.end.character, Number.MAX_VALUE);
//         assert.equal(range.end.line, end.line);
//     });

//     test("should ignore empty newline", () => {
//         let empty = end.with(2, 0);
//         let range = makeRange(start, empty);
//         assert.equal(range.end.character, Number.MAX_VALUE);
//         assert.equal(range.end.line, 1);
//     });
// });