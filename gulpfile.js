'use strict';   //Copying files and cleaning up the dist folder

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync')
del = require('del');
imagemin = require('gulp-imagemin');
uglify = require('gulp-ulglify'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cleanCss = require('gulp-clean-css'),
flatmap = require('gulp-flatmap'),
htmlmin = require('gulp-htmlmin'),

gulp.task('sass', function() {
 return gulp.src('./css/*.scss') 
 .pipe(sass().on('error',sass.logError))
 .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function(){
     gulp.watch('./css/*scss', ['sass']);
});

gulp.task('browser-sync', function(){
  var files = [
    './*.html',
    './css/*.css',
    './js/*.js',
    './img/*.{png,jpg,gif}'
  ];

browserSync.init(files, {
  server: {
          baseDir: './'
 }
});
});

guip.task('default', ['browser-sync'], function() {
  gulp.start('sass:watch');
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copyfonts', function() {
gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*');
 pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
return gulp.src('img/*.{png,jpg,gif}')
.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true}))
.pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
return gulp.src('./*.html')
.pipe(flatmap(function(stream, file) {
 return stream
 .pipe(usemin({
  css: [rev()],
  html: [ function() { return htmlmin({collaspeWhitespace: true})}],
  js: [ uglify()],
  inlinejs: [ uglify()],
  inlinecss: [cleanCss(), 'concat']
 }))
}))
.pipe(gulp.dest('dist/'));
});
gulp.task('build', ['clean'], function(){
  gulp.start('copyfonts', 'imagemin', 'usemin');
});    //Preparing the Distribution of folders and files
