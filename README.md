# vscode-insert-template

[![](https://vsmarketplacebadge.apphb.com/version-short/yskoht.vscode-insert-template.svg)](https://marketplace.visualstudio.com/items?itemName=yskoht.vscode-insert-template)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/yskoht.vscode-insert-template.svg)](https://marketplace.visualstudio.com/items?itemName=yskoht.vscode-insert-template)
[![](https://vsmarketplacebadge.apphb.com/rating-short/yskoht.vscode-insert-template.svg)](https://marketplace.visualstudio.com/items?itemName=yskoht.vscode-insert-template)

<p align="center">
  <img height="320" src="https://raw.githubusercontent.com/yskoht/vscode-insert-template/images/logo.png">
</p>

## Features

Insert template file in active file.

## Demo

Choose `Insert Template` from the Command Palette (`Cmd + Shift + P`). And select your template file name.

<p align="center">
  <img src="https://raw.githubusercontent.com/yskoht/vscode-insert-template/images/example.gif">
</p>

## Extension Settings

* `insertTemplate.directory`: (optional) search directory for template files (default: `~/.vscode-templates`)
* `insertTemplate.ignore`: (optional) an array of glob patterns to exclude matches.

### Setting Examples

settings.json
```json
  "insertTemplate": {
    "directory": "~/prg/competitive-programming",
    "ignore": ["**/*.md", "**/tmp/**"]
  }
```

## Assign Keybinding

keybindings.json
```json
  {
    "key": "ctrl+shift+i",
    "command": "extension.insertTemplate"
  },
```

## License

This software is released under the MIT License, see LICENSE.
