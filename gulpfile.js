var gulp = require('gulp');
var gutil= require('gulp-util');
var $    = require('gulp-load-plugins')();
var sassPaths = [
  'assets/scss/*.scss',
];
var jsPaths = [
  'assets/js/jquery-3.2.1.min.js',
  'assets/js/lightbox.min.js',
  'assets/js/masonry.js',
  'assets/js/main.js'
];

gulp.task('sass', function() {
  return gulp.src('assets/scss/main.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed ** file size **
    })
    .on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: ['last 2 versions', 'ie >= 9']
  }))
  .pipe(gulp.dest('assets/css'))
});

gulp.task('scripts', function() {
  return gulp
    .src(jsPaths)
    .pipe($.sourcemaps.init())
    .pipe($.concat('site.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe($.rename('site.js'))
    .pipe($.uglify().on('error', gutil.log))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('assets/js'));
});
gulp.task('default', ['sass', 'scripts'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
  gulp.watch(['assets/js/**/*.js'], ['scripts']);
});
