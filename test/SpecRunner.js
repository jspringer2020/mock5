/* globals mocha, window */
define(function() {
  "use strict";

  function getSpecs() {
    var prefix = window.__karma__ ? "/base/" : "../",
        result = [],
        specs = [
          "test/specs/amd/MarriageProposalSpec.js",
          "test/specs/amd/PersonSpec.js"
        ];
    
    for (var x = 0; x < specs.length; x++) {
      result.push(prefix + specs[x]);
    }
    
    return result;
  }

  // Initialize the App when the DOM is ready
  mocha.setup("bdd");
  mocha.timeout(15000);

  require(getSpecs(), function() {
    if (window.__karma__ && window.__karma__.start) {
      window.__karma__.start();
    }
    else {
      mocha.run();
    }
  });
});
