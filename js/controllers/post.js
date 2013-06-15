define(['disqus'], function() {
  return {
    postRendering: function() {
      document.getElementById('disqus_thread').style.display = 'block';
    }
  };
});
