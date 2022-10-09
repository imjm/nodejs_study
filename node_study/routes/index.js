var express = require('express');
var router = express.Router();
var tp = require('../lib/template.js');
router.get('/', function(request, response) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = tp.list(request.list);
    var html = tp.html(title, list, 
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">`, 
      '<a href="/topic/create">create</a>');
    response.send(html);
  });

  module.exports = router;