// Disq.us configuration
var disqus_shortname = 'beaumet';

requirejs.config({
  baseUrl: "/js/libs",

  paths: {
    "controller": "../controllers",
    "module": "../modules",
    "tool": "../tools",
    "www/disqus": "http://" + disqus_shortname + ".disqus.com/embed.js"
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
    // If current page is a post
    else if (/^\/[0-9]+/.test(window.location.pathname)) {
      require(['controller/post'], function(controller) {
        controller.postRendering();
      });
    }

  });
});
