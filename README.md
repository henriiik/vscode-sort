# Sort for Visual Studio Code

## Installation

Install from inside Code by bringing up running the `install extension` command and typing `sort`. Check out the [documentation](https://code.visualstudio.com/docs/editor/extension-gallery) for more information.

## Usage

Select some text and press `shift+alt+s` to sort your current selection, press again to reverse the sort.

If you have selected multiple lines, lines will be sorted. If you have selected part of a line, words will be sorted.

## Configuration

If you want to set the locale for the sort, you can do so with the `sort.locale` option. Then the function [localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) is used for the sort, follow the link for more information.

```
{
	"sort.locale": "sv",
}
```