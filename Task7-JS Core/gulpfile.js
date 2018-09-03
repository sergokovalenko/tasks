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
    return gulp.src('src/js/realizations/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('watch', ['scripts', 'browser-sync'], function () {
    gulp.watch('src/js/realizations/*.js', ['scripts', browserSync.reload]);
    gulp.watch('src/css/**/*.css', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('build', ['scripts'], function () {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/js/**/script.min.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['watch']);
