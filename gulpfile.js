var gulp = require('gulp');
var uglify = require('gulp-uglify');// minimied
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var image = require("gulp-image");
var imageresize = require("gulp-image-resize");


gulp.task('scripts', function(done) {
  return gulp
      .src(['./js/*.js', '!node_modules/**']) // looking at
      .pipe(eslint()) // run the file
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream());
      
});

gulp.task('js-watch', gulp.series('scripts'), function(done) { // after u run scripts after done scripts
  browserSync.reload();
  done();
});

gulp.task('sass', function(done) {
return gulp
  .src('./sass/*.scss')
  .pipe(sass())
  .pipe(
    autoprefixer({
      browsers: ['last 2 versions'] //support last 2 version
    })
  )
  .pipe(concat('style.min.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream()); //telling the browser to run
});



gulp.task('image', function () {
  return gulp
  .src('./images/*')
  // .pipe(imageresize({
  //     width : 640,
  //     height : 640,
  //     crop : true,
  //     upscale : false
  //   }))
    .pipe(image())
    .pipe(gulp.dest('./build/img'));
});
 


  gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    }); //from current directory

  gulp.watch('./images/*', gulp.series('image'));
  gulp.watch('./js/*.js', gulp.series('js-watch')); //look at this dir, run this anytime it change
  gulp.watch('./sass/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('serve'));