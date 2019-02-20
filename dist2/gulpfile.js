var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "dist/"
    });

    gulp.watch("dev/sass/*.sass", ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("dev/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('autoprefixer', function() {
    gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/mincss/'))
});

gulp.task('mincss', function() {
  return gulp.src('dist/mincss/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/mincss2'));
});