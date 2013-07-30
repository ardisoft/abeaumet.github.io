---
layout: nil
---

define(['tool/getQueryString', 'module/searchEngine'], function(getQueryString, searchEngine) {
  var posts = [
    {% for post in site.posts %}
    {'url': '{{ post.url }}', 'title': '{{ post.title }}', 'tags': [ {% for tag in post.tags %}'{{ tag }}', {% endfor %}], 'content': '{{ post.content | strip_html | strip_newlines }}'},
    {% endfor %}
  ];

  function getformattedResults(results) {
    var ret = [];
    var results_number = results.length;

    if (results_number == 0)
      return '<p>There is no result.</p>';

    for (var i = 0 ; i < results_number ; i++) {
      var post = posts[results[i].ref]

      ret[i] = '<li><a href="' + post.url + '">' + post.title + '</a></li>';
    }

    return '<ul>' + ret.join('') + '</ul>';
  }

  return (function() {
      var query = getQueryString('q');
      var results = searchEngine.search(query, posts);
      var formattedResults = getformattedResults(results);

      document.getElementById('results').innerHTML = formattedResults;
  });
});
