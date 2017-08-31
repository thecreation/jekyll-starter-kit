import gulp from 'gulp';
import config from '../config';
import browser from './browser';

// WATCH TASKS
// ------------------
// watches for changes, recompiles & injects html + assets
gulp.task('watch:styles', () => {
  gulp.watch(`${config.styles.source}/**/*.scss`, gulp.series('styles'));
});

gulp.task('watch:scripts', () => {
  gulp.watch(`${config.scripts.source}/**/*.js`, gulp.series('scripts'));
});

gulp.task('watch:images', () => {
  gulp.watch(`${config.images.source}/**/*`, gulp.series('images'));
});

gulp.task('watch:sprite', () => {
  gulp.watch(`${config.sprite.source}/**/*`, gulp.series('sprite'));
});

gulp.task('watch:svgs', () => {
  gulp.watch(`${config.svgs.source}/**/*`, gulp.series('svgs'));
});

gulp.task('watch:html', () => {
  gulp.watch(
    ['site/**/*', 'config.js', '_config.yml', '_config_dev.yml', '_config_prod.yml'],
    gulp.series('jekyll:drafts', function(done) {
      browser.notify('Rebuilded Jekyll');
      browser.reload();
      done();
    })
  );
});

gulp.task('watch:misc', () => {
  gulp.watch(
    ['config.js'],
    gulp.series('html', 'styles', 'scripts', 'svgs', 'images')
  );
});

gulp.task(
  'watch',
  gulp.parallel(
    'watch:styles',
    'watch:scripts',
    'watch:images',
    'watch:svgs',
    'watch:html',
    'watch:misc'
  )
);
