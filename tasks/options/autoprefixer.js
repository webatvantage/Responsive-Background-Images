module.exports = {
  options: {
    browsers: ['last 2 version'],
    map: true
  },
  multiple_files: {
    expand: true,
    flatten: true,
    src: 'css/*.css',
    dest: 'css/'
  }
}