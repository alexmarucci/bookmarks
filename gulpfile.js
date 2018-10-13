var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    port = 8889,
    reloadPort = 35736
;

var path = {
    dirname(_path) {
        let match = _path.match(/.*\//);
        return match ? match[0] : '';
    },
    basename(_path) {
        let match = _path.replace(/.*\//, '');
        return match ? match[0] : '';
    }
  }

// Watch Files
var watchFiles = {
  html: 'app/*.html',
  sass: 'app/scss/**/*.scss',
  css: 'app/css/*.css',
};

// Server Task
gulp.task('connect', function () {
  connect.server({
    port: port,
    // livereload: true,
    livereload: {
      port: reloadPort
    }
  });
});

// HTML Task
gulp.task('reload-views', function () {
    gulp.src(watchFiles.html)
        .pipe(connect.reload())
    ;
});

// SASS Task
gulp.task('sass', function () {
    return gulp.src(watchFiles.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dirname(watchFiles.css)))
    ;
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch([watchFiles.html, watchFiles.css], ['reload-views']);
    gulp.watch(watchFiles.sass, ['sass']);
});

gulp.task('default', ['connect', 'watch']);