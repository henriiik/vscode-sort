import * as assert from "assert";
import * as vscode from "vscode";
import {sort, makeRange} from "../src/sorter";

suite("sort()", () => {
    function testSeparator(s: string, name: string) {
        let locale = "en";

        test(`should sort ${name}`, () => {
            assert.equal(`a${s}b${s}c`, sort(`b${s}c${s}a`, s, locale));
        });

        test(`should sort ${name} with trailing whitespace`, () => {
            assert.equal(`a${s}b${s}c${s}`, sort(`b${s}c${s}a${s}`, s, locale));
        });

        test(`should sort ${name} with leading whitespace`, () => {
            assert.equal(`${s}a${s}b${s}c`, sort(`${s}b${s}c${s}a`, s, locale));
        });

        test(`should sort ${name} with trailing and leading whitespace`, () => {
            assert.equal(`${s}a${s}b${s}c${s}`, sort(`${s}b${s}c${s}a${s}`, s, locale));
        });

        test(`should reverse sort ${name}`, () => {
            assert.equal(`c${s}b${s}a`, sort(`a${s}b${s}c`, s, locale));
        });

        test(`should sort comma separated ${name}`, () => {
            assert.equal(`a,${s}b,${s}c`, sort(`c,${s}a,${s}b`, s, locale));
        });

        test(`should sort comma separated ${name} with trailing whitespace`, () => {
            assert.equal(`a,${s}b,${s}c${s}`, sort(`b,${s}c,${s}a${s}`, s, locale));
        });

        test(`should sort comma separated ${name} with leading whitespace`, () => {
            assert.equal(`${s}a,${s}b,${s}c`, sort(`${s}b,${s}c,${s}a`, s, locale));
        });

        test(`should sort comma separated ${name} with trailing and leading whitespace`, () => {
            assert.equal(`${s}a,${s}b,${s}c,${s}`, sort(`${s}b,${s}c,${s}a,${s}`, s, locale));
        });

        test(`should reverse sort comma separated ${name}`, () => {
            assert.equal(`c,${s}b,${s}a`, sort(`a,${s}b,${s}c`, s, locale));
        });

        test(`should sort comma separated ${name} with trailing comma`, () => {
            assert.equal(`a,${s}b,${s}c,`, sort(`c,${s}a,${s}b,`, s, locale));
        });

        test(`should reverse sort comma separated ${name}`, () => {
            assert.equal(`c,${s}b,${s}a,`, sort(`a,${s}b,${s}c,`, s, locale));
        });

        test(`should sort ${name} by locale`, () => {
            let text = `ä${s}b${s}a`;
            let sortedSV = `a${s}b${s}ä`;
            let localseSV = `sv`;
            assert.equal(sortedSV, sort(text, s, localseSV));

            let sortedDE = `a${s}ä${s}b`;
            let localeDE = "de";
            assert.equal(sortedDE, sort(text, s, localeDE));
        });

        test(`should sort ${name} without locale`, () => {
            let locale = "";
            let text = `AA${s}aA${s}aa${s}Aa`;
            let sorted = `AA${s}Aa${s}aA${s}aa`;
            assert.equal(sorted, sort(text, s, locale));

            let reversed = `aa${s}aA${s}Aa${s}AA`;
            assert.equal(reversed, sort(sorted, s, locale));
        });
    }

    testSeparator(" ", "words");

    testSeparator("\n", "LF lines");

    testSeparator("\r\n", "CRLF lines");
});
