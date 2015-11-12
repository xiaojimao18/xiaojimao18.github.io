var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js-min', function() {
    gulp.src(['./js/*.js', '!./js/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('css-min', function() {
    gulp.src(['./css/*.css', '!./css/*.min.css'])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', ['js-min', 'css-min'], function() {
    gulp.watch(['./js/*.js', '!./js/*.min.js'], ['js-min']);
    gulp.watch(['./css/*.css', '!./css/*.min.css'], ['css-min']);
});