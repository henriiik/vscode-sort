import * as vscode from "vscode";

export function makeRange(start: vscode.Position, end: vscode.Position, document: vscode.TextDocument) {
    if (end.character === 0) {
        end = document.lineAt(end.line - 1).range.end;
    }

    if (start.line !== end.line) {
        start = start.with(start.line, 0);
        end = document.lineAt(end.line).range.end;
    }

    return new vscode.Range(start, end);
}

export function sort(text: string, separator: string, locale: string, sensitivity: string) {
    let leadRegexp = new RegExp("^" + separator + "+");
    let trailRegexp = new RegExp(separator + "+$");
    let itemRegexp = new RegExp(separator + "+");

    let lead = leadRegexp.exec(text) || "";
    text = text.replace(leadRegexp, "");

    let trail = trailRegexp.exec(text) || "";
    text = text.replace(trailRegexp, "");

    let items = text.split(itemRegexp);
    if (text[text.length - 1] !== ",") {
        let test = text.split(new RegExp("," + separator + "+"));
        if (test.length >= items.length) {
            items = test;
            separator = "," + separator;
        }
    }

    let sorted = items.sort((a, b) => a.localeCompare(b, locale, { sensitivity }));
    let sortedText = sorted.join(separator);

    if (text === sortedText) {
        sorted = sorted.reverse();
        // sorted = items.sort((a, b) => -a.localeCompare(b, locale, { sensitivity }));
        sortedText = sorted.join(separator);
    }

    return lead + sortedText + trail;
}

export function sorter(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let settings = vscode.workspace.getConfiguration("sort");
    let locale = settings.get("locale", "en");
    let sensitivity = settings.get("ignore-case", false) ? "accent" : "variant";

    let start = textEditor.selection.start;
    let end = textEditor.selection.end;
    let range = makeRange(start, end, textEditor.document);

    let text = textEditor.document.getText(range);
    let eol = text.indexOf("\r\n") > 0 ? "\r\n" : "\n";
    let separator = (range.start.line === range.end.line) ? " " : eol;

    let sortedText = sort(text, separator, locale, sensitivity);

    edit.replace(range, sortedText);
}
