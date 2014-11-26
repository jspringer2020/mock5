/* globals requirejs */
requirejs.config({
  baseUrl: './src/',
  paths: {
    app: 'amd/main',
    "jquery": "amd/libs/jquery-2.1.1.min",
    "specRunner": "../test/SpecRunner",
    "Squire": "../test/libs/Squire",
    "should": "../test/libs/should.min",
    "chance": "../test/libs/chance"
  },
  "shim": {
    "specRunner": {
      deps: [
        "should",
        "Squire",
        "chance"
      ]
    }
  }
});
