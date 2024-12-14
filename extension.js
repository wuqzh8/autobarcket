// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	context.subscriptions.push(
		vscode.commands.registerCommand('autoBracket.CompleteParenthesis', () => {
			const editor = vscode.window.activeTextEditor;
			console.log("editor", editor);

			if (editor) {
				autoCompleteBracket(editor, '(');
			}
		}),

		vscode.commands.registerCommand('autoBracke.CompleteCurlyBrace', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				autoCompleteBracket(editor, '{');
			}
		}),


		vscode.commands.registerCommand('autoBracket.CompleteSquareBracket', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				autoCompleteBracket(editor, '[');
			}
		}),

		vscode.commands.registerCommand('autoBracket.CompleteAuto', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				autoCompleteBracket(editor, '(');
				autoCompleteBracket(editor, '{');
				autoCompleteBracket(editor, '[');
			}
		})
	);
}

// 补全指定括号
/**
 * @param {vscode.TextEditor} editor
 * @param {string} bracketType
 */
function autoCompleteBracket(editor, bracketType) {
	const selection = editor.selection;
	const currentLineText = editor.document.lineAt(selection.active.line).text;

	// 判断缺失的括号数量
	const missingCount = MissingClosingBracket(currentLineText, bracketType);

	if (missingCount > 0) {
		// 补全缺失的括号
		const updatedText = bracketType === '(' ? ')'.repeat(missingCount) :
			bracketType === '{' ? '}'.repeat(missingCount) :
				']'.repeat(missingCount);

		const range = new vscode.Range(selection.active.line, currentLineText.length, selection.active.line, currentLineText.length);
		editor.edit((/** @type {{ insert: (arg0: vscode.Position, arg1: string) => void; }} */ editBuilder) => {
			editBuilder.insert(range.end, updatedText); // 插入缺失的括号
		}).then(() => {
			// vscode.window.showInformationMessage(`Closing ${bracketType} added!`);
		});
	// } else {
	// 	vscode.window.showInformationMessage(`No ${bracketType} missing!`);
	}
}


/**
 * @param {string} line
 * @param {string} bracketType
 */
function MissingClosingBracket(line, bracketType) {
	let openBracket, closeBracket;
	// 根据传入的括号类型判断对应的开括号和闭括号
	switch (bracketType) {
		case '(':
			openBracket = '(';
			closeBracket = ')';
			break;
		case '{':
			openBracket = '{';
			closeBracket = '}';
			break;
		case '[':
			openBracket = '[';
			closeBracket = ']';
			break;
		default:
			throw new Error('Unsupported bracket type');
	}
	// 统计当前行中的开括号和闭括号
	// const openCount = (line.match(new RegExp(`\\${openBracket}`, 'g')) || []).length;
	// const closeCount = (line.match(new RegExp(`\\${closeBracket}`, 'g')) || []).length;
	const openCount = charCount(line, openBracket)
	const closeCount = charCount(line, closeBracket)

	// 返回缺失的括号数量
	return openCount - closeCount;
}

/**
 * @param {string} line
 * @param {string} char
 */
function charCount(line, char) {
	let count = 0;
	for (let i = 0; i < line.length; i++) {
		if (line[i] === char) {
			count++;
		}
	}
	return count;
}


// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
