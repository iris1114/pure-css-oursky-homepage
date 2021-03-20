const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");
const pumbler =require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const cssnano = require('cssnano');
const rename =require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const imagemin = require("gulp-imagemin");


//path
const paths = {
    clean:{
        dest:'./js',
        page:'./*.html'
    },
    html: {
        src: './src/**/*.html',
        dest: './'
    },
    sass: {
      src: './src/scss/*.scss',
      dest: './css'
    },
    css:{
        src: './src/css/*.css',
        dest: './css'
    },
    js: {
      src: './src/js/*.js',
      dest: './js'
    },
    image: {
        src: './src/image/**/*',
        dest: './image'
    }
};

//clean file
function cleanTask() {
    return del([paths.clean.dest,paths.clean.page]);
}

//html
function htmlTask() {  
    return src(paths.html.src)
    .pipe(pumbler())
    .pipe(dest(paths.html.dest)); 
}

//scss
function scssTask() {    
    return src(paths.sass.src)
        .pipe(pumbler())
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(postcss([ autoprefixer(), cssnano() ])) 
        .pipe(rename({
            suffix: '.min'
         }))
        .pipe(dest(paths.sass.dest))
}

//css
function cssTask() {    
    return src(paths.css.src)
        .pipe(pumbler())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
         }))
        .pipe(dest(paths.css.dest));
}

//js
function jsTask() {
    return src(paths.js.src,{allowEmpty: true})
        .pipe(pumbler())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.')) 
        .pipe(dest(paths.js.dest));
}

//image
// function imageTask() {
//     return src(paths.image.src)
//         .pipe(imagemin(
//             [
//                 imagemin.gifsicle(), 
//                 imagemin.mozjpeg(), 
//                 imagemin.optipng(), 
//                 imagemin.svgo()
//             ], 
//             {
//                 verbose: true
//             }
//         ))
//         .pipe(dest(paths.image.dest)
//     );
// };

//watch
function watchTask() {
    watch([paths.html.src, paths.sass.src, paths.css.src, paths.js.src ],
        {interval: 1000, usePolling: true}, 
        series(cleanTask, htmlTask, scssTask, cssTask, jsTask),
    );  
}

//build
exports.default = series(
    cleanTask,
    series(htmlTask, scssTask, cssTask, jsTask),
    watchTask
);