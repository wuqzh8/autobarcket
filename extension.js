// The module 'vscode' contains the VS Code extensibility API


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const pair = {
	'(': ')',
	'{': '}',
	'[': ']'
};
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	context.subscriptions.push(
		vscode.commands.registerCommand('autoBracket.CompleteParenthesis', () => {
			const editor = vscode.window.activeTextEditor;
			editor && completeBracket(editor, '(');
		}),

		vscode.commands.registerCommand('autoBracket.CompleteCurlyBrace', () => {
			const editor = vscode.window.activeTextEditor;
			editor && completeBracket(editor, '{');
		}),


		vscode.commands.registerCommand('autoBracket.CompleteSquareBracket', () => {
			const editor = vscode.window.activeTextEditor;
			editor && completeBracket(editor, '[')
		}),

		vscode.commands.registerCommand('autoBracket.CompleteAuto', () => {
			const editor = vscode.window.activeTextEditor;
			editor && completeBracket(editor, 'all')
		})
	);
}


/**
 * 向行尾插入文本的函数
 * @param {vscode.TextEditor} editor
 * @param {string} text
 */
function writeToEndOfLine(editor, text) {
	const selection = editor.selection;
	const currentLineText = editor.document.lineAt(selection.active.line).text;

	// 创建一个范围，表示行尾
	const range = new vscode.Range(selection.active.line, currentLineText.length, selection.active.line, currentLineText.length);

	// 在行尾插入文本
	editor.edit((editBuilder) => {
		editBuilder.insert(range.end, text);
	}).then(() => {
		// vscode.window.showInformationMessage(`Closing ${bracketType} added!`);
	});
}


// 补全指定括号
/**
 * @param {vscode.TextEditor} editor
 * @param {string} bracketType
 */
function completeBracket(editor, bracketType) {
	const selection = editor.selection;
	const lineText = editor.document.lineAt(selection.active.line).text;
	if (bracketType == 'all') {
		const updateText = calMissBrackets(lineText)
		updateText && writeToEndOfLine(editor, updateText)
		return
	}
	// 判断缺失的括号数量
	const missingCount = charCount(lineText, bracketType)-charCount(lineText, pair[bracketType])
	if (missingCount > 0) {
		// 补全缺失的括号
		writeToEndOfLine(editor, pair[bracketType].repeat(missingCount))
	}
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

/**
 * @param {string} line
 */
function calMissBrackets(line) {
	const stack = []; // 用来保存未匹配的括号

	let result = '';

	for (let char of line) {
		if (char === '(' || char === '{' || char === '[') {
			// 如果是打开括号，压入栈
			stack.push(char);
		} else if (char === ')' || char === '}' || char === ']') {
			// 如果是关闭括号，检查栈顶是否有匹配的打开括号
			if (stack.length > 0 && pair[stack[stack.length - 1]] === char) {
				stack.pop(); // 匹配成功，弹出栈顶元素
			}
		}
	}

	// 将剩余的未匹配的括号补全
	while (stack.length > 0) {
		const openBracket = stack.pop();
		result += pair[openBracket]; // 补充相应的闭合括号
	}

	return result;
}




// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
