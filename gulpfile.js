var gulp = require('gulp'),
        bower = require('gulp-bower'),
        less = require('gulp-less'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        path = require('path'),
        browserify = require('browserify'),
        sourcemaps = require('gulp-sourcemaps'),
        rimraf = require('gulp-rimraf'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer');


gulp.task('bower', function () {
    return bower()
            .pipe(gulp.dest('vendor/'));
});

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest('release/css'));
});
gulp.task('content', function () {
    return gulp.src(['content/**/', 'content/*'])
            .pipe(gulp.dest('release/content'));
});

// JSHint task
gulp.task('jshint', function () {
    gulp.src(['app/*.js', 'app/js/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    //.pipe(jshint.reporter('fail'));
});

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
                // .pipe(uglify())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./release/js/'));
    };

    return bundle();
});


gulp.task('uglify', function () {
    gulp.src('./release/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./release/js'));
});

// Views task
gulp.task('views', function () {
    // Get our index.html
    gulp.src('./app/index.html')
            // And put it in the release folder
            .pipe(gulp.dest('release/'));

    // Any other view files from /views
    gulp.src('./app/views/**/*')
            // Will be put in the dist/views folder
            .pipe(gulp.dest('release/views/'));
});

// Clean task
gulp.task('clean', function () {
    gulp.src('./release/views', {
        read: false
    }) // much faster
            .pipe(rimraf({
                force: true
            }));
});

//default task run it use: gulp
gulp.task('default', ['jshint', 'js', 'views', 'less', 'watch']);

gulp.task('build', ['jshint', 'js', 'clean', 'views', 'less', 'content']);

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch(['app/js/*.js', 'app/js/**/*.js'], ['jshint', 'js']);
    gulp.watch(['app/views/**/*', '*.html'], ['views']);
});