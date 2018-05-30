const gulp = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const run = require('gulp-run-command').default
var runSequence = require('run-sequence');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('tmp'));
});

gulp.task('merge', function () {
  return gulp.src('./tmp/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/'));
})

// NOTE: Invoke help task
gulp.task('upload', function(){
  run('clasp push');
});

gulp.task('deploy', function(){
  runSequence('compile',
              'merge',
              'upload')
});