define(function() {
  "use strict";

  function getSpecs() {
    return [
      "./specs/amd/MarriageProposalSpec.js",
      "./specs/amd/PersonSpec.js"
    ];
  }

  // Initialize the App when the DOM is ready
  mocha.setup("bdd");
  mocha.timeout(15000);

  require(getSpecs(), function() {
    requirejs.config({ baseUrl: "../src/" });
    mocha.run();
  });
});
