const banner            = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n')
const browserSync       = require('browser-sync').create()
const concat            = require('gulp-concat')
const cssnext           = require('postcss-cssnext')
const csswring          = require('csswring')
const del               = require('del')
const gulp              = require('gulp')
const header            = require('gulp-header')
const notify            = require('gulp-notify')
const pkg               = require('./package.json')
const plumber           = require('gulp-plumber')
const postcss           = require('gulp-postcss')
const rename            = require('gulp-rename')
const reporter          = require('postcss-reporter')
const runSequence       = require('run-sequence')
const standard          = require('gulp-standard')
const stylelint         = require('stylelint')
const stylelintStandard = require('stylelint-config-standard')
const uglify            = require('gulp-uglify')
const webpack           = require('webpack-stream')

/*
  --------------------
  Clean task
  --------------------
*/

gulp.task('clean', function () {
  return del(['**/.DS_Store'])
})

/*
  --------------------
  Scripts tasks
  --------------------
*/

gulp.task('scripts:standard', () => {
  return gulp.src(['./src/scripts/focuser.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: false
    }))
})

gulp.task('scripts:main', () => {
  return gulp.src(['./src/scripts/focuser.js'])
    .pipe(webpack({
      module: {
        loaders: [{
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }]
      },
      output: {
        chunkFilename: '[name].js',
        library: 'focuser',
        libraryTarget: 'umd',
        umdNamedDefine: true
      }
    }))
    .pipe(rename('focuser.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify('Build complete'))
})

gulp.task('scripts:polyfill', () => {
  return gulp.src(['./src/scripts/polyfills/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(notify('Polyfill scripts task complete'))
})

gulp.task('scripts:ie8', () => {
  return gulp.src(['./src/scripts/polyfills/ie8/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('lte-IE8.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(notify('IE8 scripts task complete'))
})

gulp.task('scripts', [
  'scripts:standard',
  'scripts:main',
  'scripts:polyfill',
  'scripts:ie8'
])

/*
  --------------------
  Style tasks
  --------------------
*/

gulp.task('styles', () => {
  var processors = [
    stylelint(stylelintStandard),
    reporter({
      clearMessages: true
    }),
    cssnext({browsers: ['last 3 versions', '> 1%', 'ie >= 9']}),
    csswring
  ];

  return gulp.src(['./src/styles/*.pcss'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(postcss(processors))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./'))
    .pipe(notify('Styles task complete'))
})

/*
  --------------------
  Default task
  --------------------
*/

gulp.task('default', () => {
  runSequence(
    'clean',
    [
      'scripts',
      'styles'
    ],
    () => {
      browserSync.init({
        server: {
          baseDir: './'
        }
      })

      gulp.watch([
        './src/scripts/focuser.js',
        './src/scripts/polyfills/*.js'
      ], ['scripts']).on('change', browserSync.reload)

      gulp.watch([
        './src/styles/*.pcss'
      ], ['styles']).on('change', browserSync.reload)

      gulp.watch([
        './*.html',
      ]).on('change', browserSync.reload)
    }
  )
})
