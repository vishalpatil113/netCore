var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'smartech-icons';

gulp.task('iconfont', function(){
  gulp.src(['src/assets/icons/smartech-font/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'src/assets/templates/_icons.css',
      targetPath: '_icons-generated.css',
      fontPath: ''
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(gulp.dest('src/assets/'));
});
