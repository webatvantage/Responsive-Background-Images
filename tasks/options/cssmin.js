module.exports = {
    minify: {
        expand: true,
        src: ['css/*.css', 'css/!*.min.css'],
        ext: '.min.css'
    }
}