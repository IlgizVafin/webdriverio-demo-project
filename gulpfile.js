var gulp = require('gulp'),
    webdriver = require('gulp-webdriver'),
    selenium = require('selenium-standalone'),
    runSequence = require('run-sequence'),
    del = require('del'),
    fs = require('fs'),
    babel = require('gulp-babel'),
    exec = require('child_process').exec;

var ALLURE_REPORT = 'allure-report',
    ALLURE_RESULT = 'allure-results',
    ERROR_SHOTS = 'errorShots';

function killSelenium() {
    if (selenium.child) {
        return selenium.child.kill();
    }
}

gulp.task('clean:artifacts', function () {
    return del([ALLURE_REPORT, ALLURE_RESULT, ERROR_SHOTS]);
});

gulp.task('mkdir', function () {
    return fs.mkdir(ERROR_SHOTS);
});

gulp.task('selenium:start', function (done) {
    return selenium.install({}, function (err) {
        if (err) return done(err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('selenium:end', killSelenium);

gulp.task('test-ui', function () {
    return gulp
        .src('wdio.conf.js')
        .pipe(webdriver());
});

gulp.task('generate-report', function () {

    if (!fs.existsSync(ALLURE_RESULT)) {
        return;
    }

    exec('node "node_modules/allure-commandline/bin/allure" generate ' + ALLURE_RESULT, function (error, stdout, stderr) {
        if (error) {
            console.error('exec error: ' + error);
            return;
        }
        console.log('stdout: ' + stdout);

        if (stderr) {
            console.log('stderr: ' + stderr);
        }
    });
});

gulp.task('open-report', function () {
    exec('node "node_modules/allure-commandline/bin/allure" report open', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error: ' + error);
            return;
        }
        console.log('stdout: ' + stdout);

        if (stderr) {
            console.log('stderr: ' + stderr);
        }
    });
});

gulp.task('test:local', function () {
    return runSequence(
        ['clean:artifacts', 'selenium:start'],
        'mkdir',
        'test-ui',
        'selenium:end',
        function (err) {
            if (err) {
                killSelenium();
            }
            gulp.run('generate-report');
        });
});