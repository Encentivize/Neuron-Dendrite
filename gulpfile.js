'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var jsPath = ['./src/**/*.js'];
var unitTestsPath = ['./test/**/*.unit.js'];
var integrationTestsPath = ['./test/**/*.integration.js'];
var allTestsPath = unitTestsPath.concat(integrationTestsPath);

gulp.task('lint', function () {
    return gulp.src(jsPath.concat(allTestsPath))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('tests', function () {
    return gulp.src(jsPath)
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(allTestsPath, {
                read: false
            })
                .pipe(mocha({
                    reporter: 'nyan'
                }))
                .pipe(istanbul.writeReports());
        });
});

gulp.task('default', ['lint', 'tests']);

gulp.task('watch', ['lint', 'tests'], function () {
    gulp.watch(jsPath, ['lint', 'tests']);
});
