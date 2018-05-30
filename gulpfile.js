const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const run = require('gulp-run-command').default
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

const isWindows = process.platform === "win32";

let tsProject = ts.createProject('tsconfig.json');
let claspPath = 'build/'
let claspFolders = [];

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}


gulp.task('compile', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('./'));
});

// NOTE: Invoke help task
gulp.task('upload', function(done){
  let cmd = 'clasp';
  if(isWindows) cmd += '.cmd';

  finishedCount = 0;

  var tasks = claspFolders.map(function(folder){
    return spawn(cmd, ['push'], {cwd: claspPath + folder + '/'})
      .on('close', function(){console.log('finished folder '+folder)})
  })
  console.log('gonna close upload');
  done();
});

gulp.task('get-folders', function(){
  claspFolders = getFolders(claspPath);
  console.log(claspFolders);
})

gulp.task('copy', function(){
  var tasks = claspFolders.map(function(folder){
    return gulp.src(claspPath + 'main.js')
      .pipe(gulp.dest(claspPath + folder + '/'))
  }) 
})

gulp.task('deploy', function(){
  runSequence('compile',
              'get-folders',
              'copy',
              'upload')
});