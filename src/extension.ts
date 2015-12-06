import * as vscode from "vscode";

function sorter(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	let settings = vscode.workspace.getConfiguration("sort");
	let locale = settings.get("locale", "en");
	let sensitivity = settings.get("ignore-case", false) ? "accent" : "variant";

	let start = textEditor.selection.start;
	let end = textEditor.selection.end;

	if (end.character === 0) {
		end = end.with(end.line - 1, Number.MAX_VALUE);
	}

	if (start.line !== end.line) {
		start = start.with(undefined, 0);
		end = end.with(undefined, Number.MAX_VALUE);
	}

	let range = new vscode.Range(start, end);
	let text = textEditor.document.getText(range);

	let separator = (start.line === end.line) ? " " : "\n";
	let items = text.split(separator);

	let sorted = items.sort((a, b) => a.localeCompare(b, locale, { sensitivity }));
	let sortedText = sorted.join(separator);

	if (text === sortedText) {
		sorted = items.sort((a, b) => -a.localeCompare(b, locale, { sensitivity }));
		sortedText = sorted.join(separator);
	}

	edit.replace(range, sortedText);
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand("extension.sort", sorter);

	context.subscriptions.push(disposable);
}