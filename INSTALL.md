# Installing pHTML Jsx

[pHTML Jsx] runs in all Node environments, with special instructions for:

| [Node](#node) | [CLI](#phtml-cli) | [Eleventy](#eleventy) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- |

## Node

Add [pHTML Jsx] to your project:

```bash
npm install @phtmlorg/jsx --save-dev
```

Use [pHTML Jsx] to process your HTML:

```js
const phtmlJsx = require('@phtmlorg/jsx')

phtmlJsx.process(YOUR_HTML /*, processOptions, pluginOptions */)
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml')
const phtmlJsx = require('@phtmlorg/jsx')

phtml([
  phtmlJsx(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */)
```

## CLI

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p @phtmlorg/jsx
```

Alternatively, add [pHTML Jsx] to your `phtml.config.js` configuration file:

```js
module.exports = {
  plugins: [
    ['@phtmlorg/jsx', /* pluginOptions */]
  ]
}
```

## Eleventy

Add [pHTML Eleventy] and [pHTML Jsx] to your Eleventy project:

```sh
npm install @phtmlorg/jsx @phtml/11ty --save-dev
```

Use [pHTML Eleventy] and [pHTML Jsx] in your Eleventy configuration:

```js
const phtml11ty = require('@phtml/11ty')
const phtmlJsx = require('@phtmlorg/jsx')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(phtml11ty, {
    use: [
      phtmlJsx(/* pluginOptions */)
    ]
  })
}
```

## Gulp

Add [Gulp pHTML] and [pHTML Jsx] to your project:

```bash
npm install @phtmlorg/jsx gulp-phtml --save-dev
```

Use [Gulp pHTML] and [pHTML Jsx] in your Gulpfile:

```js
const gulp = require('gulp')
const gulpPhtml = require('gulp-phtml')
const phtmlJsx = require('@phtmlorg/jsx')

gulp.task('html',
  () => gulp.src('./src/*.html').pipe(
    gulpPhtml({
      plugins: [
        phtmlJsx(/* pluginOptions */)
      ]
    })
  ).pipe(
    gulp.dest('dist')
  )
)
```

## Grunt

Add [Grunt pHTML] to your project:

```bash
npm install grunt-phtml --save-dev
```

Use [Grunt pHTML] and [pHTML Jsx] in your Gruntfile:

```js
const phtmlJsx = require('@phtmlorg/jsx')

grunt.loadNpmTasks('grunt-phtml')

grunt.initConfig({
  phtml: {
    options: {
      plugins: [
        phtmlJsx(/* pluginOptions */)
      ]
    },
    dist: {
      files: [{
        expand: true,
        src: 'src/*.html',
        dest: 'dest'
      }]
    }
  }
})
```

[Gulp pHTML]: https://github.com/phtmlorg/gulp-phtml
[Grunt pHTML]: https://github.com/phtmlorg/grunt-phtml
[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Eleventy]: https://github.com/phtmlorg/phtml-11ty
[pHTML Jsx]: https://github.com/phtmlorg/phtml-jsx
