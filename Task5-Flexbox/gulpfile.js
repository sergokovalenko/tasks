var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['scss'], function () {

    gulp.src('app/css/main.css')
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src(['app/img/**/*.jpg', 'app/img/**/*.png'])
        .pipe(gulp.dest('dist/img'));

});

gulp.task('default', ['watch']);