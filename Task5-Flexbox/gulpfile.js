var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
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
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['sass'], function () {

    gulp.src('app/css/main.css')
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src(['app/img/**/*.jpg', 'app/img/**/*.png'])
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);