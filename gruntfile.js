module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*Spec.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['clear', 'lint', 'test']
    },
    mochacli: {
      options: {
        "check-leaks": true, /* Check for global variable leaks*/
        require: ['should'],
        reporter: 'spec',
        bail: true
      },
      all: ['./test/specs/**/*Spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', ['lint', 'test']);

  grunt.registerTask('default', ['build']);

};