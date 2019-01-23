var gulp = require('gulp');
var fs = require('fs');
var plumber = require('gulp-plumber');
var ejs = require('gulp-ejs');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var notify  = require('gulp-notify');
var watch = require('gulp-watch');
var cache = require('gulp-cached');
var sassGlob = require('gulp-sass-glob');

var destDir = 'html/css'; // 出力用ディレクトリ
var hugoDir = 'html/theme/static/css'; // 出力用ディレクトリ
var srcSass = 'resource/sass/**/*.scss';

var cleanCSS = require('gulp-clean-css');

gulp.task('ejs',function(){
  var json_path = 'src/data/json/data.json';
  var json = JSON.parse(fs.readFileSync(json_path,'utf8'));

  return gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
    .pipe(ejs(
      { json: json },
      {},
      { ext: '.html' }
    ))
    .pipe(gulp.dest('public/'));
});

gulp.task('default', gulp.series( gulp.parallel('ejs'), function(){
  gulp.watch('src/ejs/**/*.ejs', gulp.task('ejs'));
}));
