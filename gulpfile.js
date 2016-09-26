var gulp = require('gulp');
var watch = require('gulp-watch');
var conn = require('gulp-connect');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var packageJson = require('./package.json');

var paths = {
    dist: packageJson.directories.dist,
    app: packageJson.directories.app,
    version: packageJson.version + "/",
    minFile: packageJson.appFiles.compressed,
    file: packageJson.appFiles.uncompressed
};

var files = [
    paths.app + 'app.js',
    paths.app + 'module/notes/notes.module.js',
    paths.app + 'module/notes/**/*.js'
];

gulp.task('clean', function (cb) {
    return gulp.src(paths.dist + paths.version)
        .pipe(clean({force: true}, cb));
});

gulp.task('concat', function () {
   return gulp.src(files)
       .pipe(sourcemaps.init())
       .pipe(ngAnnotate())
       .pipe(concat(paths.file))
       .pipe(sourcemaps.write("/"))
       .pipe(gulp.dest(paths.dist + paths.version));
});

gulp.task('uglify', function () {
   return gulp.src(files)
       .pipe(ngAnnotate())
       .pipe(concat(paths.minFile))
       .pipe(uglify())
       .pipe(gulp.dest(paths.dist + paths.version));
});

gulp.task('server', function () {
    conn.server({
        port: 9000
    })
});

gulp.task('watch', function () {
    return gulp.watch(paths.app + '**', ['clean', 'concat', 'uglify']);
});

gulp.task('default', ['clean', 'concat', 'uglify', 'server', 'watch']);