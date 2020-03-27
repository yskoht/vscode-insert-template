# vscode-insert-template

## Features

Insert template file in active file.

## Example

Choose `Insert Template` from the Command Palette (`Cmd + Shift + P`). And select your template file name.

![example](https://raw.githubusercontent.com/yskoht/vscode-insert-template/images/example.gif)

## Extension Settings

* `insertTemplate.directory`: (optional) search directory for template files (default: `~/.vscode-templates`)
* `ignore`: (optional) an array of glob patterns to exclude matches.

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
