
import * as vscode from 'vscode';
import * as Commands from './commands';

const activate = function(context: vscode.ExtensionContext)  {
	const disposableAddTodo = vscode.commands.registerCommand('todo.addNewTodo', Commands.addNewTodo );
	const disposableToggleDone = vscode.commands.registerCommand('todo.toggleDone', Commands.toggleDone );
	context.subscriptions.push(disposableAddTodo, disposableToggleDone);
}


// this method is called when your extension is deactivated
const deactivate  = function() {}


/* EXPORT */

export { activate, deactivate};
