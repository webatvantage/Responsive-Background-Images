module.exports = {
  options: {
    browsers: ['last 2 version', 'ie 8', 'ie 9', 'ie 10'],
    map: true
  },
  multiple_files: {
    expand: true,
    flatten: true,
    src: 'css/*.css',
    dest: 'css/'
  }
}