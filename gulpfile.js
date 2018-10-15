var gulp = require('gulp'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    closureCompiler = require('google-closure-compiler').gulp(),
    webpack = require('webpack-stream'),
    named = require('vinyl-named'),
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
};

const closureCompilerOptions = {
    compilation_level: 'ADVANCED',
    warning_level: 'VERBOSE',
    language_in: 'ECMASCRIPT_2016',
    language_out: 'ECMASCRIPT5_STRICT',
    output_wrapper: '(function(){\n%output%\n}).call(this)',
    js: [
        './node_modules/angular/angular.js'
    ],
    js_output_file: 'app.min.js',
    module_resolution: 'NODE',
    angular_pass: true,
    process_common_js_modules: true
};

// Watch Files
var watchFiles = {
  html: 'app/*.html',
  sass: 'app/scss/**/*.scss',
  css: 'css/*.css',
  js: 'app/js/**/*.js',
  compiledJs: 'js/**/*.js' 
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

// Compiler Task
gulp.task('js-compile', function () {
    return gulp.src(watchFiles.js, {base: './'})
        .pipe(
            closureCompiler(closureCompilerOptions, {platform: 'javascript'})
        )
        .pipe(gulp.dest('./dist/js'));
});

// Babel Compile
gulp.task('babel-compile', function() {
    gulp.src([
      'node_modules/babel-polyfill/dist/polyfill.js',
      watchFiles.js
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('js'));
});

// WebPack
gulp.task('webpack', function () {
    return gulp.src(watchFiles.compiledJs)
      .pipe(named())
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('dist'));
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch([watchFiles.html, watchFiles.css, 'dist/*.js'], ['reload-views']);
    gulp.watch(watchFiles.sass, ['sass']);
    gulp.watch(watchFiles.js, ['babel-compile']);
    gulp.watch(watchFiles.compiledJs, ['webpack']);
});

gulp.task('default', ['connect', 'watch']);