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
gulp.task('static_content', function () {
    return gulp.src(['app/static_content/**/', 'app/static_content/*'])
        .pipe(gulp.dest('release/static_content'));
});

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


gulp.task('uglify', function () {
    gulp.src('./release/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./release/js'));
});

gulp.task('cssmin', function () {
    gulp.src('./release/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./release/css'));
});

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
    // Get our index.html
    gulp.src('./app/index.html')
        // And put it in the release folder
        .pipe(gulp.dest('release/'));

    // Any other view files from /views
    gulp.src('./app/views/**/*')
        // Will be put in the release/views folder
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
gulp.task('default', ['jshint', 'js', 'views', 'static_content', 'api_content', 'less', 'watch']);

//builds the project
gulp.task('build', ['jshint', 'js', 'views', 'less', 'static_content', 'api_content']);
gulp.task('release', ['uglify', 'cssmin', 'minify-html]);

// Rerun the task when a file changes
gulp.task('watch', function () {
                gulp.watch('app/less/**/*.less', ['less']);
                gulp.watch(['app/js/*.js', 'app/js/**/*.js'], ['jshint', 'js']);
                gulp.watch(['app/views/**/*', 'app/*.html'], ['views', 'static_content']);
                gulp.watch(['API/**/*'], ['api_content']);
            });