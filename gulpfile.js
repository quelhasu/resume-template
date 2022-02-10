var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
var prettify = require('gulp-jsbeautifier');
var less = require('gulp-less');
var path = require('path');
var data = require('gulp-data');
var pugI18n = require('gulp-i18n-pug');

var fs = require('fs');

var source = './src';
var destination = './build';

gulp.task('html', function () {
  var options = {
    i18n: {
      dest: 'dist',
      locales: source + '/locales/*.*',
      namespace: '$t',
      localeExtension: true
    },
    pretty: true
  };
  return gulp
    .src(source + "/views/resume.pug")
    .pipe(pugI18n(options))
    // .pipe(pug())
    .pipe(prettify())
    .pipe(gulp.dest(destination + "/"));
});

gulp.task('sass', function () {
  return gulp.src([source + '/sass/*.sass', source + '/sass/*.scss', source + '/sass/*.css'])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination + '/css'));
});

gulp.task('less', function () {
  return gulp.src(source + '/style/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(destination));
});

gulp.task('js', function () {
  return gulp.src(source + '/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('image', function () {
  return gulp.src(source + '/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest(destination + '/img'));
});


gulp.task('watch', function () {
  gulp.watch([source + '/sass/*.sass', source + '/sass/*.css', source + '/sass/*.scss'], gulp.series('sass'));
  gulp.watch(source + '/views/*.pug', gulp.series(['html']));
  gulp.watch(source + '/locales/*', gulp.series('html'));
  gulp.watch(source + '/style/*.less', gulp.series('less'));
  gulp.watch(source + '/js/*.js', gulp.series('js'));
  gulp.watch(source + '/img/*', gulp.series('image'));
});

var dev = gulp.series(['html', 'js', 'less', 'image', 'watch']);
var build = gulp.series(['html', 'js', 'less', 'image']);

gulp.task('default', build);
gulp.task('dev', dev);