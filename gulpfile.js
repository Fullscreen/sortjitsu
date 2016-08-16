var del = require('del'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    notify = require('gulp-notify'),
    Server = require('karma').Server,
    pkg = require('./package.json');

var paths = {
  FILENAME: 'jquery.sortjitsu.js',
  FILENAME_MIN: 'jquery.sortjitsu.min.js',
  MIN: '.min',
  SRC: 'src/',
  DIST: 'dist/'
};

var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '',
  ''].join('\n');

gulp.task('clean-dev', function () {
  return del(paths.DIST + paths.FILENAME);
});

gulp.task('clean-prod', function () {
  return del(paths.DIST + paths.FILENAME_MIN);
});

gulp.task('lint', function () {
  return gulp.src(paths.SRC + paths.FILENAME)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // https://github.com/mikaelbr/gulp-notify#as-jshint-reporter
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      return file.relative + " (" + file.jshint.results.length + " errors)";
    }));
});

gulp.task('build-dev', ['lint', 'clean-dev'], function () {
  gulp.src(paths.SRC + paths.FILENAME)
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('build-prod', ['lint', 'clean-prod'], function () {
  gulp.src(paths.SRC + paths.FILENAME)
    .pipe(uglify())
    // https://gist.github.com/nodesocket/c33362a8a2efabdbdf36
    .on('error', notify.onError('Error: uglification failed'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({suffix: paths.MIN}))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('watch', function () {
  gulp.watch(paths.SRC + paths.FILENAME, ['build-dev', 'build-prod']);
});

gulp.task('default', ['build-dev', 'build-prod', 'watch']);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
