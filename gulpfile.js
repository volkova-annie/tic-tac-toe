const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const plugins = [
  require('cssnext'),
  require('autoprefixer'),
  require('cssnano')({
    autoprefixer: false,
    discardComment: {removeAll: true},
    safe: true,
  }),
];
const BS = require('browser-sync');

gulp.task('javascripts', () => {
  gulp.src('src/**/*.js')
  .pipe($.babel({
    presets: ['es2015']
  }))
  .pipe($.concat('app.js'))
  .pipe(gulp.dest('./static/'))
  .pipe(BS.reload({
    stream: true,
  }));
});

gulp.task('styles', () => {
  gulp.src('src/**/*.css')
  .pipe($.postcss(plugins))
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
gulp.task('watch', ['javascripts', 'styles'], () => {
  gulp.watch(['src/**/*.js'], ['javascripts']);
  gulp.watch(['src/**/*.css'], ['styles']);
  gulp.watch(['templates/**/*.ejs'], () => {
    BS.reload();
  });
});

gulp.task('default', ['watch', 'server']);
