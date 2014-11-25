/* globals requirejs */
requirejs.config({
  baseUrl: 'src/amd',
  paths: {
    app: 'main',
    "jquery": "../../libs/jquery-2.1.1.min",
    "specRunner": "../../SpecRunner",
    "Squire": "../../libs/Squire",
    "should": "../../libs/should.min",
    "chance": "../../libs/chance"
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
