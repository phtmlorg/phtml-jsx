# pHTML JSX [<img src="https://phtmlorg.github.io/phtml/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[pHTML JSX] lets you use JSX in HTML.

```jsx
<!doctype html>
<>
  <html lang="en" dir={"ltr"}>
    <head>
      <title>pHTML JSX</title>
    </head>
    <body>
      <p class={'foo'}>Hello, {'World'}!</p>
    </body>
  </html>
</>

<!-- becomes -->

<!doctype html>
<html lang="en" dir="ltr"><head><title>pHTML JSX</title></head><body><p class="foo">Hello, World!</p></body></html>
```

Alternatively, a `jsx` attribute can toggle an existing element.

```jsx
<!doctype html>
<html jsx lang="en" dir={"ltr"}>
  <head>
    <title>pHTML JSX</title>
  </head>
  <body>
    <p class={'foo'}>Hello, {'World'}!</p>
  </body>
</html>

<!-- becomes -->

<!doctype html>
<html lang="en" dir="ltr"><head><title>pHTML JSX</title></head><body><p class="foo">Hello, World!</p></body></html>
```

## Usage

Add [pHTML JSX] to your project:

```bash
npm install @phtml/jsx --save-dev
```

Use [pHTML JSX] to process your HTML:

```js
const phtmlJsx = require('@phtml/jsx');

phtmlJsx.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const phtmlJsx = require('@phtml/jsx');

phtml([
  phtmlJsx(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[pHTML JSX] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [pHTML CLI](INSTALL.md#phtml-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

### data

The `data` option defines an object whose properties will be accessible as
global variables within JSX fragments.

[cli-img]: https://img.shields.io/travis/phtmlorg/phtml-jsx.svg
[cli-url]: https://travis-ci.org/phtmlorg/phtml-jsx
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/@phtml/jsx.svg
[npm-url]: https://www.npmjs.com/package/@phtml/jsx

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML JSX]: https://github.com/phtmlorg/phtml-jsx
