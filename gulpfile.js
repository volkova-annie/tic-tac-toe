const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const scss = require('postcss-scss');
const $ = gulpLoadPlugins();
const plugins = [
  require('postcss-nested'),
  require('postcss-responsive-type'),
  require('autoprefixer'),
  require('cssnano')({
    autoprefixer: false,
    discardComment: {removeAll: true},
    safe: true,
  }),
];
const BS = require('browser-sync');

// gulp.task('javascripts', () => {
//   gulp.src('src/**/*.js')
//   .pipe($.babel({
//     presets: ['es2015']
//   }))
//   .pipe($.concat('app.js'))
//   .pipe(gulp.dest('./static/'))
//   .pipe(BS.reload({
//     stream: true,
//   }));
// });

gulp.task('styles', () => {
  gulp.src(['src/**/*.scss', 'components/**/*.scss'])
  .pipe($.postcss(plugins, { parser: scss }))
  .pipe($.concat('app.css'))
  .pipe(gulp.dest('./static/'))
  .pipe(BS.reload({
    stream: true,
  }));
});

gulp.task('server', () => {
  BS({
    proxy: 'localhost:4000',
    files: ['static/**/*'],
    open: false,
  })
})
gulp.task('watch', ['styles'], () => {
  // gulp.watch(['src/**/*.js'], ['javascripts']);
  gulp.watch(['src/**/*.scss', 'components/**/*.scss'], ['styles']);
  gulp.watch(['templates/**/*.ejs'], () => {
    BS.reload();
  });
});

gulp.task('default', ['watch', 'server']);
