# autobracket README

Automatically inserts missing closing brackets at the end of the line.  
自动在行尾补全缺失的闭括号  

## commands
```json
// `ctrl+shift+p`
// 自动识别缺少的括号并补全 inserts all missing closing brackets
{"command": "autoBracket.CompleteAuto", "title": "complete all brackets auto"}
// 补全()
{"command": "autoBracket.CompleteParenthesis", "title": "complete parenthesis"},
// 补全{}
{"command": "autoBracket.CompleteCurlyBrace", "title": "complete curly brace"},
// 补全[]
{"command": "autoBracket.CompleteSquareBracket", "title": "complete square bracket"},
```

## with vscodeVim
```json
// in Settings.json
"vim.normalModeKeyBindingsNonRecursive": [
    { "before": ["<space>", "a"], "commands": ["autoBracket.CompleteAuto"] },
  ]
```

## Features

## Requirements

## Extension Settings

## Known Issues

## Release Notes

## For more information


