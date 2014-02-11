# gulp-textile
> Textile to HTML with [textile-js](https://github.com/borgar/textile-js) for gulp 3

*Issues with the output should be reported on the textile-js [issue tracker](https://github.com/borgar/textile-js/issues).*

## Usage

First, install `gulp-textile` as a development dependency:

```shell
npm install --save-dev gulp-textile
```

Then, add it to your `gulpfile.js`:

```js
var gulp = require('gulp');
var textile = require('gulp-textile');

gulp.task('default', function () {
  return gulp.src('hello.textile')
             .pipe(textile())
             .pipe(gulp.dest('dist'));
});
```

## API

### textile(options)

`options` is passed along to [textile-js](https://github.com/borgar/textile-js#options).

## License

MIT © [Shuhei Kagawa](https://github.com/shuhei)

