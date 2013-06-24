({
  baseUrl: "/js/libs",
  paths: {
    "controller": "../controllers",
    "module": "../modules",
    "tool": "../tools",
  },
  shim: {
    "lunr": { exports: "lunr" }
  },

  // from
  appDir: "www_/",
  // to
  dir: "www",

  modules: [{
    name: "../main"
  }],

  optimize: "uglify2",
  preserveLicenseComments: false,
  findNestedDependencies: true,
  removeCombined: true,
})
