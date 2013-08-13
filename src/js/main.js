// Disq.us configuration
var disqus_shortname = 'abeaumet';

requirejs.config({
    baseUrl: '/libs/js',

    paths: {
        'controller': '/js/controllers',
        'module': '/js/modules',
        'tool': '/js/tools',
        'www/disqus': '//go.disqus.com/embed',
        'www/disqus_count': '//go.disqus.com/count',
    },
    shim: {
        'lunr': { exports: 'lunr' }
    }
});

require(['domReady'], function(domReady) {
    domReady(function() {

        // In all cases, display JavaScript based search engine
        document.getElementById('search-form').style.display = 'inline';

        // If current page is home
        if (/^\/(?:page\/[0-9]+\/)?(?:index.html)?$/.test(window.location.pathname))
            require(['controller/homepage'], function(controller) { controller(); });
        // If current page is /search
        else if (/^\/search/.test(window.location.pathname))
            require(['controller/search'], function(controller) { controller(); });
        // If current page is a post
        else if (document.getElementById('disqus_thread') != null)
            require(['controller/post'], function(controller) { controller(); });

    });
});
