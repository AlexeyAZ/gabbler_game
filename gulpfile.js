const folders = {
    build: 'build',
    src: 'src',
    dist: 'dist'
}

const localServer = {
    options: {
        server: {
          baseDir: "./" + folders.dist
        },
        open: true,
        notify: false,
        https: true
    }
}

const plugins = {
    js: [
        'bower_components/jquery/dist/jquery.min.js',
    ],
    css: [
        'bower_components/reset-css/reset.css',
    ]
}

const gulp = require('gulp'),
    bs = require("browser-sync").create(),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug'),
    jadeInheritance = require('gulp-jade-inheritance'),
    bulkSass = require('gulp-sass-bulk-import'),
    moduleImporter = require('sass-module-importer'),
    sass = require('gulp-sass'),
    wait = require('gulp-wait'),
    prefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    typograf = require('gulp-typograf'),
    eslint = require('gulp-eslint'),
    devip = require('dev-ip'),
    changed = require('gulp-changed'),
    webpack = require("webpack-stream"),
    path = require("path"),
    prettify = require('gulp-prettify'),
    htmlbeautify = require('gulp-html-beautify');

console.log("ip list: " + devip()); // show all ip list. Need for browsersync host option

function onError(err) {
    console.log(err);
    //this.emit('end');
}


gulp.task('browserSync', function() {
    bs.init(localServer.options);
});


gulp.task('lint', function () {
    return gulp.src([folders.src + '/scripts/**/*.js', folders.src + '/components/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('scripts', function() {
    return gulp.src([folders.src + '/scripts/app.js'])
        .pipe(webpack({
            module: {
                rules: [
                    { 
                        test: /\.js$/, 
                        exclude: /(node_modules|bower_components|vendor.js)/, 
                        loader: "babel-loader"
                    }
                ]
            },
            output: {
                filename: 'app.js',
            },
            devtool: 'source-map',
            resolve: {
                alias: {
                    "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
                    "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
                    "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
                    "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
                    "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
                    "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
                    "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
                }
            }
        }))
        .pipe(gulp.dest(folders.dist + '/scripts'))
        .pipe(bs.stream());
});


gulp.task('vendor', function () {
    gulp.src(plugins.css)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(folders.dist + '/styles/'));
    gulp.src(plugins.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(folders.dist + '/scripts/'));
});


gulp.task('pug', function() {
    gulp.src(folders.src + '/pages/*.pug')
        // .pipe(changed(folders.dist, {extension: '.html'}))
        // .pipe(jadeInheritance({basedir: folders.src + '/views/pages'}))
        .pipe(pug())
    .on('error', onError)
    .pipe(gulp.dest(folders.dist))
    .on('end', function(){
        gulp.src(folders.dist + '/**/*.html')
            .pipe(typograf({
                locale: ['ru', 'en-US'],
                enableRule: ["common/nbsp/afterNumber"],
                disableRule: ["ru/other/phone-number"]
            }))
            .pipe(prettify())
            .pipe(gulp.dest(folders.dist))
            .pipe(bs.stream({once: true}));
    });
});


gulp.task('sass', function () {
    gulp.src(folders.src + '/styles/main.scss')
    .pipe(bulkSass())
    .pipe(wait(500))
    .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [folders.src + '/styles/', folders.src + '/components/'],
            importer: moduleImporter()
        })
        .on('error', sass.logError))
        .pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7"))
    .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(folders.dist + '/styles'))
        .pipe(bs.stream());
});


gulp.task('svgSpriteBuild', function () {
    return gulp.src(folders.dist + '/img/**/*.svg')
    // minify svg
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg",
                render: {
                    scss: {
                        dest: '../../styles/_sprite.scss',
                        template: folders.src + "/styles/svg-templates/_sprite_template.scss"
                    }
                }
            }
        }
    }))
    .pipe(gulp.dest(folders.src + '/sprite/'));
});


gulp.task('dist', [
    'pug',
    'sass',
    'scripts',
    'lint',
    'vendor',
    'svgSpriteBuild'
]);


gulp.task('watch', function() {

    watch([folders.src + '/components/**/*.pug', folders.src + '/pages/**/*.pug'], function() {
        gulp.start('pug');
    });
    
    watch([folders.src + '/styles/**/*.scss', folders.src + '/components/**/*.scss'], function() {
        gulp.start('sass');
    });

    watch([folders.src + '/scripts/**/*.js', folders.src + '/components/**/*.js'], function() {
        gulp.start(['lint', 'scripts']);
    });

    // watch(folders.src + '/img/slide5/**/*.svg', function() {
    //     gulp.start('svgSpriteBuild');
    // });
});


gulp.task('default', ['lint', 'dist', 'browserSync', 'watch']);
