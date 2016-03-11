import * as vscode from "vscode";
import {sorter} from "./sorter";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand("extension.sort", sorter);

    context.subscriptions.push(disposable);
}