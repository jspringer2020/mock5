/* globals requirejs */
requirejs.config({
  baseUrl: './src',
  paths: {
    app: 'amd/main',
    "jquery": "../../src/amd/libs/jquery-2.1.1.min",
    "specRunner": "../SpecRunner",
    "Squire": "../libs/Squire",
    "should": "../libs/should.min",
    "chance": "../libs/chance"
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
