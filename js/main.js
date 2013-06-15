requirejs.config({
  baseUrl: "/js/libs",
  paths: {
    "controller": "/js/controllers",
    "module": "/js/modules",
    "tool": "/js/tools"
  },
  shim: {
    "lunr": { exports: "lunr" }
  }
});

require(['domReady'], function(domReady) {
  domReady(function() {

    // If current page is /search
    if (/^\/search/.test(window.location.pathname)) {
      require(['controller/search'], function(controller) {
        controller.postRendering();
      });
    }

  });
});
