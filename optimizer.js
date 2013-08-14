({
  baseUrl: "libs/js",

  paths: {
    "controller": "../../js/controllers",
    "module": "../../js/modules",
    "tool": "../../js/tools",
    'www/disqus': '//go.disqus.com/embed',
    'www/disqus_count': '//go.disqus.com/count',
  },
  shim: {
    "lunr": { exports: "lunr" }
  },

  // from
  appDir: "www_/",
  // to
  dir: "www",

  modules: [{
    name: "../../js/main"
  }],

  optimize: "uglify2",
  preserveLicenseComments: false,
  findNestedDependencies: true,
  removeCombined: true,
})
