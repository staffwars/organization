/**
 * gulp
 *
 * ** ビルド
 *
 * $ gulp
 *
 * ** ローカルサーバーを立ち上げる
 *
 * $ gulp serve
 *
 * ** sprite
 *
 * $ gulp sprite
 *
 * ** 画像を圧縮
 *
 * $ gulp image
 *
 * ** スタイルガイド
 *
 * $ gulp style
 *
 * ---------------------------------------------------------------------- */

/*
 * init package
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var fs = require('fs');
var events = require('events');
events.EventEmitter.defaultMaxListeners = 100;


/*
 * path
 */
var path = {
  src: 'src/',
  tmp: 'tmp/',
  docs: 'docs/',
  css_src: 'src/css/',
  js_src: 'src/js/',
  img_src: 'src/img/',
  sprite_src: 'src/sprite/'
};


/*
 * del
 */
var del = require('del');
gulp.task('del', function () {
  return del(path.docs);
});


/*
 * sprite
 */
var spritesmith = require('gulp.spritesmith');
var replace = require('gulp-replace');
gulp.task('sprite', function () {
  var dt = new Date();
  var dtObj = {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    date: dt.getDate(),
    hours: dt.getHours(),
    minutes: dt.getMinutes()
  };
  var timestamp = '';
  for (var key in dtObj) {
    if (dtObj[key] < 10) {
      dtObj[key] = '0' + dtObj[key];
    }
    timestamp += dtObj[key];
  }

  var spriteData = gulp.src(path.sprite_src + 'sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.css',
      imgPath: '../img/sprite.png',
      cssFormat: 'scss',
      padding: 4,
      cssOpts: { // スプライト用SCSS内のmixinの記述をなくす
        functions: false
      }
    }));
  spriteData.img.pipe(gulp.dest(path.img_src));
  spriteData.css.pipe(replace(/.png/g, '.png' + '?revision=' + timestamp))
    .pipe(gulp.dest(path.css_src + 'setting/'))
    .pipe(size({
      title: 'size : sprite'
    }));
});


/*
 * image optim
 */
var imageOptim = require('gulp-imageoptim');
gulp.task('image', function() {
  return gulp.src(path.img_src + '**/*.{png,jpg}')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest(path.img_src));
});


/*
 * html
 */
// htmlmin
var htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin', function() {
  return gulp.src(path.src + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.docs))
    .pipe(size({
      title: 'size : html'
    }));
});


/*
 * css
 */
// precss
// calc
// autoprefixer
var postcss = require('gulp-postcss');
var precss = require('precss');
var calc = require('postcss-calc');
var autoprefixer = require('autoprefixer');
gulp.task('precss', function () {
  return gulp.src(path.css_src + '*.css')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(postcss([
      precss(),
      calc(),
      autoprefixer({
        browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4.1'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(path.tmp + 'css/'));
});

// cssnano
var cssnano = require('cssnano');
gulp.task('cssnano', function () {
  return gulp.src(path.tmp + 'css/*.css')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(gulp.dest(path.docs + 'css/'))
    .pipe(size({
      title: 'size : css'
    }));
});


/*
 * js
 */
// browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
gulp.task('browserify', function () {
  return browserify({entries: [path.js_src + 'script.js']})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(source('script.js'))
    .pipe(gulp.dest(path.tmp + 'js/'));
});

// uglify
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {
  return gulp.src(path.tmp + 'js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.docs + 'js/'))
    .pipe(size({
      title: 'size : js'
    }));
});

// eslint
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src(path.js_src + '**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(eslint())
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
});


/*
 * img
 */
// copy
gulp.task('copy', function () {
  return gulp.src(path.img_src + '**/*.{png,jpg}')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.docs + 'img/'))
    .pipe(size({
      title: 'size : copy'
    }));
});


/*
 * browserSync
 */
var browserSync = require('browser-sync');
gulp.task('browserSync', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: path.docs
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});


/*
 * watch
 */
gulp.task('watch', ['browserSync'], function () {
  gulp.watch(path.html_src + '**/*.{ejs,json}', ['build:html']);
  gulp.watch(path.css_src + '**/*.css', ['build:css']);
  gulp.watch(path.js_src + '**/*.js', ['build:js']);
  gulp.watch(path.img_src + '**/*.{png,jpg}', ['build:img']);
  gulp.watch('gulpfile.js', ['build']);
  gulp.watch(path.src + '**/*', ['bs-reload']);
});


/*
 * task manage
 */
// build:html
gulp.task('build:html', function () {
  gulpSequence('htmlmin')();
});

// build:css
gulp.task('build:css', function () {
  gulpSequence('precss', 'cssnano')();
});

// build:js
gulp.task('build:js', function () {
  gulpSequence('eslint', 'browserify', 'uglify')();
});

// build:img
gulp.task('build:img', function () {
  gulpSequence('copy')();
});

// build
gulp.task('build', function () {
  gulpSequence('build:html', 'build:css', 'build:js', 'build:img')();
});

// default
gulp.task('default', function () {
  gulpSequence('build')();
});

// serve
gulp.task('serve', function () {
  gulpSequence('del', 'build', 'watch')();
});