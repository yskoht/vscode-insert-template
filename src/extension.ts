import * as vscode from 'vscode';
import * as os from 'os';
import * as glob from 'glob';

const DEFAULT_TEMPLATE_DIRECTORY = '~/.vscode-templates';

const config = () => {
	return vscode.workspace.getConfiguration('insertTemplate');
};

const expandTildeToHomeDir = (path: string): string => {
	return path.replace(/^~/, os.homedir);
};

const searchPath = () => {
	const dir: string = config().get('directory') || DEFAULT_TEMPLATE_DIRECTORY;
	const path = expandTildeToHomeDir(dir);
	return path;
};

const selectFile = async (path: string, files: string[]): Promise<string | null> => {
	const regexp = new RegExp(`^${path}/`);
	const shortNames = files.map(f => f.replace(regexp, ''));
	const pickedShortName = await vscode.window.showQuickPick(shortNames);
	const pickedFullName = pickedShortName ? `${path}/${pickedShortName}` : null;
	return pickedFullName;
};

const ignorePatterns = (): string | string[] | undefined => {
	return config().get('ignore');
};

const templateFiles = (path: string): string[] => {
	return glob.sync(`${path}/**/*`, { nodir: true, ignore: ignorePatterns() });
};

const createNewTextEditor = async (): Promise<vscode.TextEditor> => {
	const doc = await vscode.workspace.openTextDocument();
	return vscode.window.showTextDocument(doc);
};

const activeTextEditor = async (): Promise<vscode.TextEditor> => {
	return vscode.window.activeTextEditor || createNewTextEditor();
};

const insertFile = async (editor: vscode.TextEditor, file: string): Promise<void> => {
	const doc = await vscode.workspace.openTextDocument(file);
	editor.edit(editBuilder => {
		editor.selections.forEach(selection => {
				editBuilder.insert(selection.start, doc.getText());
		});
	});
};

const main = async () => {
	// template file search path
	const path = searchPath();

	// template files. If there is no template file, shows warning message.
	const files = templateFiles(path);
	if (files.length === 0) {
		vscode.window.showInformationMessage(`Template file not found. Search Directory is ${path}`);
		return;
	}

	// user selects one template file in template files.
	// if no template file is selected, exits.
	const file = await selectFile(path, files);
	if(!file) { return; }

	// user's active editor. if user doesn't have active file, creates new file.
	// normally, `editor` is never null.
	const editor = await activeTextEditor();
	if(!editor) {
		vscode.window.showErrorMessage('Editor is undefined.');
		return;
	}

	// insert selected template file in active editor.
	insertFile(editor, file);
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.insertTemplate', main);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
