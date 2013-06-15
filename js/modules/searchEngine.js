define(['lunr'], function(lunr) {
  return {
    'search': function(query, posts) {
      var lunrIndex = lunr(function() {
        this.ref('id');
        this.field('title', 20);
        this.field('tags', 50);
        this.field('content', 3);
      });

      for (var i = 0, max = posts.length ; i < max ; i++) {
        lunrIndex.add({
          'id': i,
          'title': posts[i].title,
          'tags': posts[i].tags,
          'content': posts[i].content
        });
      }

      return lunrIndex.search(query);
    }
  };
});
