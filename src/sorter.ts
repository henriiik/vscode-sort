import * as vscode from "vscode";

export function makeRange(start: vscode.Position, end: vscode.Position) {
	if (end.character === 0) {
		end = end.with(end.line - 1, Number.MAX_VALUE);
	}

	if (start.line !== end.line) {
		start = start.with(undefined, 0);
		end = end.with(undefined, Number.MAX_VALUE);
	}

	return new vscode.Range(start, end);
}

export function sort(text: string, separator: string, locale: string, sensitivity: string) {
	let items = text.split(separator);

	let sorted = items.sort((a, b) => a.localeCompare(b, locale, { sensitivity }));
	let sortedText = sorted.join(separator);

	if (text === sortedText) {
		sorted = items.sort((a, b) => -a.localeCompare(b, locale, { sensitivity }));
		sortedText = sorted.join(separator);
	}

	return sortedText;
}

export function sorter(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	let settings = vscode.workspace.getConfiguration("sort");
	let locale = settings.get("locale", "en");
	let sensitivity = settings.get("ignore-case", false) ? "accent" : "variant";

	let start = textEditor.selection.start;
	let end = textEditor.selection.end;
	let range = makeRange(start, end);

	let text = textEditor.document.getText(range);
	let separator = (start.line === end.line) ? " " : "\n";

	let sortedText = sort(text, separator, locale, sensitivity);

	edit.replace(range, sortedText);
}
