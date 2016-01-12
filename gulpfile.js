var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

// ESLint JS linting task
gulp.task('eslint', function () {
  return gulp
    .src(['./app/**/*', './test/**/*', '!./test/temp'])
    .pipe(eslint())
    .pipe(eslint.format());
});

// JS linting task
gulp.task('jshint', function () {
  return gulp
    .src(['./app/**/*', './test/**/*', '!./test/temp'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint', gulp.parallel('eslint', 'jshint'));

// Mocha test task
gulp.task('mocha', function () {
  return gulp
    .src(['./test/**/*', '!./test/temp'])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test', gulp.series('mocha', 'lint'));

// The default task (called when you run `gulp` from cli)
gulp.task('default');
