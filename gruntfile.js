var lastGruntWatchTime = null,
  watchRuns = 0;

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*Spec.js']
    },
    watch: {
      options: {
        reload: true,
        atBegin: true,
        dateFormat: printWatchOutput
      },
      files: ['<%= jshint.files %>'],
      reporter: 'Dot',
      tasks: ['clear', 'lint', 'test', 'coverage']
    },
    mochacli: {
      options: {},
      all: ['./test/specs/**/*Spec.js']
    },
    mocha_istanbul: {
      coverage: {
        src: 'test', // a folder works nicely
        options: {
          root: './src',
          quiet: true,
          reportFormats: ['lcov', 'lcovonly'],
          coverage: true,
          check: {
            lines: 50,
            statements: 50
          }
        },
        jenkins: {
          src: 'test', // a folder works nicely
          options: {
            root: './src',
            check: {
              lines: 50,
              statements: 50
            },
            reportFormats: ['lcovonly']
          }
        }
      }
    }
  });


  function printWatchOutput(time) {
    var outputColor, bgMap, bgData, message, now;
    var chanceJS = require("chance")();
    require("colors");

    now = new Date();
    watchRuns++;
    lastGruntWatchTime = lastGruntWatchTime || now;

    bgMap = [
      "bgRed|white",
      "bgBlue|white",
      "bgCyan|black",
      "bgGreen|white",
      "bgBlack|white",
      "bgWhite|black",
      "bgYellow|black",
      "bgMagenta|black"
    ];

    bgData = bgMap[chanceJS.integer({
      min: 0,
      max: bgMap.length - 1
    })];
    
    outputColor = {
      bg: bgData.substring(0, bgData.indexOf("|")),
      fg: bgData.substring(bgData.indexOf("|") + 1)
    };

    message = "Run #" + ("" + watchRuns) + " completed " +
      (Math.floor((now.getTime() - lastGruntWatchTime.getTime()) / 1000)) + "secs ago in " +
      time + "ms at " + now.toString();
    
    grunt.log.writeln(message);
    grunt.log.writeln(('Waiting for more changes...' [outputColor.bg])[outputColor.fg]);

    lastGruntWatchTime = now;
  }

  grunt.event.on('coverage', function (lcovInfo, done) {
    var lcovParse = require("lcov-parse");
    require("colors");

    lcovParse(lcovInfo, function (err, data) {
      if (err) {
        grunt.log.writeln("Error parsing lcov file".red);
        done(false);
        return;
      }

      printOutput(data);
    });

    function printOutput(lcov) {
      var functionsCoveredPercent = 0, 
          linesCoveredPercent = 0, 
          functionsCovered = 0, 
          linesCovered = 0, 
          functionsTotal = 0, 
          linesTotal = 0;
      
      for (var x = 0; x < lcov.length; x++) {
        var item = lcov[x];
        functionsCovered += item.functions.hit;
        functionsTotal += item.functions.found;
        linesCovered += item.lines.hit;
        linesTotal += item.lines.found;
      }
      
      functionsCoveredPercent = Math.round((functionsCovered / functionsTotal) * 10000) / 100;
      linesCoveredPercent = Math.round((linesCovered / linesTotal) * 10000) / 100;

      function getColor(percent) {
        var result = "green";
        if (percent < 50) {
          result = "red";
        } else if (result < 80) {
          result = "yellow";
        }

        return result;
      }

      grunt.log.writeln();
      grunt.log.writeln("There were a total of " + lcov.length + " files inspected.");
      grunt.log.writeln();
      grunt.log.writeln("  " + (functionsCoveredPercent.toString()[getColor(functionsCoveredPercent)]).bold +
                        "% coverage" [getColor(functionsCoveredPercent)] +
                        ": " + functionsCovered + " of " + functionsTotal +
                        " functions covered.");
      grunt.log.writeln("  " + (linesCoveredPercent.toString()[getColor(linesCoveredPercent)]).bold +
                        "% coverage" [getColor(linesCoveredPercent)] +
                        ": " + linesCovered + " of " + linesTotal +
                        " lines covered.");
      grunt.log.writeln();
      grunt.log.writeln();
      done(); // or done(false); in case of error
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', ['lint', 'test', 'coverage']);

  grunt.registerTask('default', ['build']);
};