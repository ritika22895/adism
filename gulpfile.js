var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var dom = require('gulp-dom');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var bump = require('gulp-bump');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var remove = require('del');
var autoprefixer = require('autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var scsslint   = require('gulp-scss-lint');

var paths = {
  root: './src/',
  dist: './build/',
  js: {
        src: './src/js/',
        dist: './build/js/'
    },
  css: {
    src: './src/css',
    dist: './build/'
    },
  lint: './src/js/',
  assets: {
    src: './src/assets/**/*',
    dist: './build/assets/'
  }
};


// Lint SCSS (For Ordering CSS property)
gulp.task('scss-lint', function() {
  return gulp.src(paths.root + '**/*.scss')
  .pipe(scsslint({
    'config': 'scss-lint.yml'
  }));
});


gulp.task('clean', function(cb) {
  return remove(['./build/**/*'], cb);
});

gulp.task('sass', function() {

  var sassOptions = {
    outputStyle: 'compressed',
    includePaths: ['node_modules', './src/styles']
  };

  var processors = [
    autoprefixer({ 
      browsers: [
        'last 2 versions',
        'IE >= 11',
        'Edge >= 25',
        'Chrome >= 38',
        'Safari >= 8',
        'Opera >= 38',
        'iOS >= 9',
        'Android >= 51'
      ]
    })
  ];
  
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dist));
});


gulp.task('scripts', function() {
  
    return gulp.src(paths.js.src + '**/*.js')
        .pipe(sourcemaps.init())
        .pipe(browserify())
        .pipe(babel({
            presets: ['env']
        }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('lint', function() {
    gulp.src(paths.lint + '**/*.js')
        .pipe(eslint({
            globals: [
                'jQuery',
                '$'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('assets', function() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dist));
});


gulp.task('assets:watch', function() {
  gulp.watch(paths.assets.src, function() {
    runSequence('assets')
  });
});

gulp.task('scripts:watch', function() {
  gulp.watch(paths.js.src + '**/*.js', function(){
    runSequence('scripts')
  });
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.root + '**/*.scss', function(){
    runSequence('sass')
  });
});

/**
 * Rerun the task when a file changes
 */
gulp.task('watch', function() {
  gulp.watch(paths.root + '**/*.scss', ['sass']);
  gulp.watch(paths.root + '**/*.scss', ['scss-lint']);
});
/* End */


gulp.task('bumpJSON', function() {
  return gulp.src('./package.json')
      .pipe(bump({
        type: 'patch'
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('bump', function() {
  runSequence('bumpJSON', 'build');
});

gulp.task('build', function() {
  runSequence('clean', ['assets', 'sass', 'scripts']);
});

gulp.task('dev', ['assets:watch', 'sass:watch', 'scripts:watch', 'watch', 'scss-lint']);
