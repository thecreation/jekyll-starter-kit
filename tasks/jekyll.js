import gulp from 'gulp';
import config from '../config';
import browser from './browser';
import {spawn} from 'child_process';
import notifier from 'node-notifier';

// JEKYLL
// ------------------
// Build the Jekyll Site
gulp.task('jekyll', (done) => {
  let jekyllConfig = config.html.config.base;
  if (config.production) {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += `,${config.html.config.production}`;
  } else {
    jekyllConfig += `,${config.html.config.development}`;
  }
  return spawn('bundle', ['exec', 'jekyll', 'build', '--config', jekyllConfig, '--source', config.html.source, '--destination', config.html.build], {stdio: 'inherit', env: process.env})
    .on('close', () => {
      if (config.enable.notify) {
        notifier.notify({
          title: config.notify.title,
          message: 'Html task complete',
        });
      }

      done();
    });
});

// Rebuild Jekyll & do page reload
gulp.task(
  'jekyll:rebuild',
  gulp.series('jekyll', (done) => {
    browser.notify('Rebuilded Jekyll');
    browser.reload();
    done();
  })
);
