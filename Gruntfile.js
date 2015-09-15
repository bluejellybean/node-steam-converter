'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
             grunt.loadNpmTasks('grunt-mocha-test');
  var reloadPort = 35732, files;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'index.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['tests/*.js']
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          '/',
          'tests/*.js',
          'index.js'
        ],
        tasks: ['develop', 'mochaTest']
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('default', [
    'mochaTest',
    'develop',
    'watch'
  ]);
};


