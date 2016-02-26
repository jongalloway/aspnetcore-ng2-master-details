﻿/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.npmSrc = "./node_modules/";
paths.npmLibs = paths.webroot + "lib/npmlibs/";


gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

var libsToMove = [
   paths.npmSrc + '/angular2/bundles/angular2-polyfills.min.js',
   paths.npmSrc + '/angular2/bundles/angular2.min.js',
   paths.npmSrc + '/angular2/bundles/http.min.js',
   paths.npmSrc + '/systemjs/dist/system.js',
   paths.npmSrc + '/systemjs/dist/system-polyfills.js',
   paths.npmSrc + '/es6-shim/es6-shim.min.js',
   paths.npmSrc + '/rxjs/bundles/Rx.js',
   paths.npmSrc + '/reflect-metadata/Reflect.js',
];

gulp.task("copy-deps:ag-grid-ng2", function () {
    return gulp.src(paths.npmSrc + '/ag-grid-ng2/**/*.*', { base: paths.npmSrc + '/ag-grid-ng2/' })
         .pipe(gulp.dest(paths.npmLibs + '/ag-grid-ng2/'));
});

gulp.task("copy-deps:ag-grid", function () {
    return gulp.src([paths.npmSrc + '/ag-grid/main.js',
                paths.npmSrc + '/ag-grid/dist/**/*.js',
                paths.npmSrc + '/ag-grid/dist/styles/*.*',
    ], { base: paths.npmSrc + '/ag-grid/' })
         .pipe(gulp.dest(paths.npmLibs + '/ag-grid/'));
});

gulp.task('moveToLibs:singleFiles', function () {
    return gulp.src(libsToMove).pipe(gulp.dest(paths.npmLibs));
});

gulp.task("moveToLibs", ["moveToLibs:singleFiles", "copy-deps:ag-grid-ng2", "copy-deps:ag-grid"]);