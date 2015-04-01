module.exports = {
    options: {
        livereload: true,
    },
    html: {
        files: ['*.php', '**/*.php', '*.html', '**/*.html']
    },
    scripts: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['jshint', 'uglify', 'notify:scripts'],
        options: {
            spawn: false,
        }
    },
    css: {
        files: ['scss/*.scss', 'scss/**/*.scss', 'css/*.css'],
        tasks: ['autoprefixer', 'cssmin','notify:css'],
        options: {
            spawn: false,
        }
    }
};