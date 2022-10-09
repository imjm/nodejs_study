var express = require('express');
var app = express();
const port = 3000
var fs = require('fs');

var compression = require('compression');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.get('*',function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);




app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
});
/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var tp = require('./lib/template.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var qs = require('querystring');
    
    
    if(pathname === '/') {
      if(queryData.id === undefined) {
      } else {
        
      }
    } else if(pathname == '/create') {
      
    }
    else if(pathname == '/create_process') {
      
    } else if(pathname == '/update'){
      
    } else if(pathname == '/update_process'){
      var body = ``;
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
        })
      })
    });
    } else if(pathname == '/delete_process'){

    });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);*/
