const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('init', [], () => {
  fs.stat('src/config/config.ts', function(err, stat) {
    // copy when file not exists
    if(err != null) {
      console.log('Coping `config.dist.ts` to `config.ts`');
      gulp.src('src/config/config.dist.ts')
        .pipe(rename('config.ts'))
        .pipe(gulp.dest('src/config'));
    }
  });
});

gulp.task('build', [], () => {
  gulp.src('src/htaccess.dist')
    .pipe(rename('.htaccess'))
    .pipe(gulp.dest('dist'));
});
