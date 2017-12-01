let gulp = require('gulp');
let clean = require('gulp-clean');
let sass = require('gulp-sass');
let Rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');
let httpProxyMiddleware = require('http-proxy-middleware');
let dest = 'dist/public';
let jsFilter = 'public/**/*.js';
let cssFilter = ['public/**/*.css', 'public/**/*.scss'];
let imgFilter = 'public/img/**/*';
let manifest = './rev-manifest.json';
let fs = require('fs');
let browserSync = require('browser-sync').create();
let browserify = require('gulp-browserify');
let watch = require('gulp-watch');
//清除build目录
gulp.task('clean', () => {
    return gulp.src(['dist', manifest], { read : false })
        .pipe(clean());
});
/**
 * 复制字体
 */
gulp.task('copyFonts', ['clean'], () => {
    return gulp.src('./public/fonts/**.*').
    pipe(gulp.dest(dest + '/fonts'));//将字体移入目录
});

//编译图片
gulp.task('img', ['copyFonts'], () => {
    return gulp.src(imgFilter)
        .pipe(Rev())
        .pipe(gulp.dest(dest + '/img'))
        .pipe(Rev.manifest({
            base :  dest,
            merge : true
        }))
        .pipe(gulp.dest(dest))
});
//编译css
gulp.task('css', ['img'], () => {
    return gulp.src(cssFilter)  
        .pipe(sass({
            data : '/data/'
        }))
        .pipe(Rev())
        .pipe(gulp.dest(dest))
        .pipe(Rev.manifest({
            base :  dest,
            merge : true
        }))
        .pipe(gulp.dest(dest))
});
//编译js
gulp.task('js', ['css'],() => {
    return gulp.src(jsFilter) 
        .pipe(Rev())
        .pipe(gulp.dest(dest))
  
        .pipe(Rev.manifest({
            base :  dest,
            merge : true
        }))
        .pipe(gulp.dest(dest))
});

gulp.task('html', ['js'],() =>{
    let json = JSON.parse(fs.readFileSync('./rev-manifest.json').toString());
    let newJSON = {};
    let manifest = gulp.src("./rev-manifest.json");
    let tempDir = '', prefix = '', suffix = '', name = '', root = '';
    for(let i in json){
        let splitI = i.split('.');
        if(splitI.length == 2){
            prefix = splitI[0];
            suffix = splitI[1];
        }else{
            prefix = splitI[0];
            for(let j = 1; j < splitI.length - 1; j++){
                prefix += '.' + splitI[j];
            }
            suffix = splitI[splitI.length - 1];
        }
        if(suffix == 'js' || suffix == 'css'){
            tempDir = suffix;
            name = prefix + '.' + (suffix == 'js' ? suffix : 'css');
            root = '';
            newJSON[name] = json[i];//替换路径
        }else{
            tempDir = 'img';
            name = i;
            newJSON['../../' + tempDir + '/' + name] = '../../' + tempDir + '/'+ json[i];//替换路径
            newJSON['../' + tempDir + '/' + name] = '../' + tempDir + '/'+ json[i];//替换路径
            newJSON[tempDir + '/' + name] = '../' + tempDir + '/'+ json[i];//替换路径
        }
    }
    fs.writeFileSync('./rev-manifest.json',JSON.stringify(newJSON));
    return gulp.src("./views/**/*.html")
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist/views'))
});

gulp.task('build', ['html'], () => {
    let manifest = gulp.src("./rev-manifest.json");
    return gulp.src(dest + "/css/**/*")
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(dest + '/css'))
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['./public/**/*', './view/**/*'], () => {
        gulp.start('build', () => {
            let timeout = null;
            function isExist(){
                timeout && clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fs.exists(dest, (bExist) => {
                        if(bExist){
                            browserSync.reload();
                        }else{
                            isExist();
                        }
                    });
                },10);
            }
            isExist();
        });
    });
});

gulp.task('sync', ['watch'], () => {
    browserSync.init({
        port : 3009,
        server : {
            baseDir : dest,
            middleware : [httpProxyMiddleware('/', {
                target : 'http://172.16.10.125:3002/',
                changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
                logLevel: 'debug',
                ws : true
            })]
        }
    });
});