
import * as vscode from 'vscode';

const toggleDone = async function () {

    const textEditor: vscode.TextEditor = getTextEditor();
    const activePosition: vscode.Position = textEditor.selection.active;
    const { text } = textEditor.document.lineAt(textEditor.selection.active.line);

    const newText: string = text.search(/-/g) == 0 ? text.replace(/-/g, '✔') : text.replace(/✔/g, '-');

    await textEditor.edit(editBuilder => {
        const startRowPosition = new vscode.Position(activePosition.line, 0);
        const endRowPosition = new vscode.Position(activePosition.line, text.length);
        const selection = new vscode.Selection(startRowPosition, endRowPosition);
        editBuilder.delete(selection);
        insertNewLine(editBuilder, activePosition.line, newText);
    });
}


const addNewTodo = async function () {

    const textEditor: vscode.TextEditor = getTextEditor();
    const activeLine: number = textEditor.selection.active.line;
    let newLineNumber = activeLine + 1;

    await textEditor.edit(editBuilder => {
        if (isLastLine(textEditor, activeLine)) {
            insertNewLine(editBuilder, newLineNumber + 2, "\n- item");
        } else {
            insertNewLine(editBuilder, newLineNumber, "- item\n");
        }
    });

    const startRowPosition = new vscode.Position(newLineNumber, 2);
    const endRowPosition = new vscode.Position(newLineNumber, 6);
    textEditor.selection = new vscode.Selection(startRowPosition, endRowPosition);
}


function insertNewLine(editBuilder: vscode.TextEditorEdit, lineNumber: number, value: string) {
    const nextRowPosition = new vscode.Position(lineNumber, 0);
    editBuilder.insert(nextRowPosition, value);
}


function getTextEditor(): vscode.TextEditor {
    const textEditor = vscode.window.activeTextEditor;
    if (textEditor) {
        return textEditor;
    }
    throw Error("Can't find active text editor");
}


function isLastLine(textEditor: vscode.TextEditor, activeLine: number): boolean {
    const lastLine: number = textEditor.document.lineAt(textEditor.document.lineCount - 1).lineNumber;
    return lastLine == activeLine;
}



export { toggleDone, addNewTodo }