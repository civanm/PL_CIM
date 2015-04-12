var gulp = require('gulp'),
    bower = require('gulp-bower'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    cssmin = require('gulp-cssmin'),
    minifyHTML = require('gulp-minify-html'),
    stylish = require('jshint-stylish'),
    path = require('path'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

//builds less into css files and move them to release
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('release/css'));
});

//moves all the static content (images/* fonts/*)
gulp.task('static_content', function () {
    return gulp.src(['app/static_content/**/', 'app/static_content/*'])
        .pipe(gulp.dest('release/static_content'));
});

//moves the api simulated files to release
gulp.task('api_content', function () {
    return gulp.src(['API/**/'])
        .pipe(gulp.dest('release/API'));
});

// JSHint task
gulp.task('jshint', function () {
    gulp.src(['app/*.js', 'app/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    //.pipe(jshint.reporter('fail'));
});

//creates the bundle file and bundle.js.map
gulp.task('js', function () {
    var bundle = function () {
        return browserify({
                entries: ['./app/js/index.js'],
                paths: ['./node_modules', '.js'],
                debug: true
            })
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./release/js/'));
    };

    return bundle();
});

//minifies the bundle file and annotates angular injected modules
gulp.task('uglify', function () {
    gulp.src('./release/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./release/js'));
});

//minifies the css generated
gulp.task('cssmin', function () {
    gulp.src('./release/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./release/css'));
});

//minifies the html views
gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./release/views/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./release/views'));
});

// Views task
gulp.task('views', function () {
    //index should be moved separately
    gulp.src('./app/index.html')
        .pipe(gulp.dest('release/'));

    // Any other view files from /views
    gulp.src('./app/views/**/*')
        .pipe(gulp.dest('release/views/'));
});


//default task run it use: gulp
gulp.task('default', ['build', 'watch']);

// 1. gulp build -> builds the project
gulp.task('build', ['jshint', 'js', 'views', 'less', 'static_content', 'api_content']);

//2. gulp release -> then minifies the generated files into release
gulp.task('release', ['uglify', 'cssmin', 'minify-html']);

// Rerun the task when a file changes
gulp.task('watch', function () {
                gulp.watch('app/less/**/*.less', ['less']);
                gulp.watch(['app/js/*.js', 'app/js/**/*.js'], ['jshint', 'js']);
                gulp.watch(['app/views/**/*', 'app/*.html'], ['views', 'static_content']);
                gulp.watch(['API/**/*'], ['api_content']);
            });