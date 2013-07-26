// Disq.us configuration
var disqus_shortname = 'beaumet';

requirejs.config({
  baseUrl: "/js/libs",

  paths: {
    "controller": "../controllers",
    "module": "../modules",
    "tool": "../tools",
    "www/disqus": "http://" + disqus_shortname + ".disqus.com/embed"
  },
  shim: {
    "lunr": { exports: "lunr" }
  }
});

require(['domReady'], function(domReady) {
  domReady(function() {

    // In all case, enable JS search engine
    document.getElementById('search-form').style.display = 'inline';

    // If current page is /search
    if (/^\/search/.test(window.location.pathname)) {
      require(['post-rendering/search'], function(search) {
        search.postRendering();
      });
    }
    // If current page is a post
    else if (/^\/[0-9]+/.test(window.location.pathname)) {
      require(['post-rendering/post'], function(post) {
        post.postRendering();
      });
    }

  });
});
