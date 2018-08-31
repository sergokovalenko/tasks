var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('src/js/**/*.js');
    gulp.watch('src/css/**/*.css', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('build', ['scripts'], function () {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['watch']);