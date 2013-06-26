({
  baseUrl: "js/libs",

  paths: {
    "controller": "../controllers",
    "module": "../modules",
    "tool": "../tools",
    "www/disqus": "http://beaumet.disqus.com/embed.js"
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
