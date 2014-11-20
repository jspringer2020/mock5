module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['clear', 'build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');

  grunt.registerTask('test', []);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', ['lint', 'test']);

  grunt.registerTask('default', ['build']);

};