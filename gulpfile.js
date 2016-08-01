var gulp       = require('gulp'),
    nodemon    = require('gulp-nodemon'),
    plumber    = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    cssmin     = require('gulp-cssmin'),
    concatCss  = require('gulp-concat-css'),
    imagemin   = require('gulp-imagemin'),
    rename     = require('gulp-rename');
    svgmin     = require('gulp-svgmin');


gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('svgmin', function () {
    return gulp.src('./public/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('imagemin', function(){
    gulp.src('.public/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
});


gulp.task('concatcss', function() {
  return gulp.src([
      './public/components/fullpage.js/dist/jquery.fullpage.css',
      './public/components/devicons/css/devicons.min.css',
      './public/components/jquery-custom-scrollbar/jquery.custom-scrollbar.css',
      './public/css/style.css'
    ])
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./public/css/'));
});


gulp.task('concatjs', function() {
  return gulp.src([
    './public/components/jquery/dist/jquery.min.js',
    './public/components/jquery.easing/js/jquery.easing.min.js',
    './public/components/Swiper/dist/js/swiper.jquery.min.js',
    './public/components/fullpage.js/dist/jquery.fullpage.min.js',
    './public/components/PreloadJS/lib/preloadjs-0.6.2.min.js',
    './public/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('minifycss', function () {
    gulp.src('./public/css/style.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css/'));
});


gulp.task('watch', function() {
  gulp.watch('./sass/*.scss', ['sass']);
});




gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js ejs coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});


gulp.task('build',['sass','concatcss', 'minifycss','imagemin','svgmin','concatjs']);

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
