const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const fileInclude = require('gulp-file-include');
// ====== IMAGES ======= //
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// ====== FONTS ======= //
const ttf2woff2 = require('gulp-ttftowoff2');
const ttf2woff = require('gulp-ttf2woff');

function htmlInclude() {
  return src([
    'app/html/*.html',
    '!app/html/_**.html'
  ])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function images() {
  return src([
    'app/images/**/*.*',
    'app/images/*.*',
  ])
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 100,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo({
        plugins: [{
          cleanupIDs: false
        }
        ]
      })
    ]))
    .pipe(webp())
    .pipe(dest('app/images'))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
    notify: false
  });
}

function clearDist() {
  return del('dist')
}

function scripts() {
  return src([
    // ===== MODULES ===== //
    // 'node_modules/swiper/swiper-bundle.js',
    'app/js/**.js',
    '!app/js/**.min.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

async function fonts() {
  src(['app/fonts/uncompressed/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
  src(['app/fonts/uncompressed/*.ttf'])
    .pipe(ttf2woff())
    .pipe(dest('app/fonts'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/images/**/*.*',
    'app/fonts/**.*',
    'app/*.html'
  ], {
    base: 'app'
  })
    .pipe(dest('dist'))
}

exports.build = series(clearDist, images, build);
exports.default = parallel(htmlInclude, styles, scripts, browsersync, watching);

exports.build = build;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.htmlInclude = htmlInclude;
exports.clearDist = clearDist;