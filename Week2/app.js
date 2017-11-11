var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let fs = require('fs');

app.locals.pretty = true;
app.set('view engine', 'pug'); //express와 jade 연결
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/form',function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  res.send('Hello,Get');
  // var title = req.query.title;
  // var description = req.query.description;
  // res.send(title+','+description);
});
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});
app.get('/posts', (req,res) =>{
  fs.readFile('posts.json', 'utf-8', (err,data) =>{
    let posts = JSON.parse(data);
    res.render('posts/index', {posts: posts.list});
  });
});
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic/0">JavaScript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
});

app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
});
app.get('/', function(req, res){
    res.send('Hello home page');;
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});

app.get('/posts/new', (req,res) =>{
  res.render('posts/new');
});
app.post('/posts',(req,res)=>{
  let title = req.body.title;
  let content = req.body.content;
  fs.readFile('posts.json', 'utf-8', (err,data) =>{
    if (err) throw err;
    let post = JSON.parse(data);
    post.recent += 1;
    // post.list[post.recent].title = title;
    // post.list[post.recent].content = content;
    post.list[post.recent] = {
      title: title,
      content: content
    };

    fs.writeFile('posts.json', JSON.stringify(post, null, 2),'utf-8',(err) =>{
      if(err) throw err;

    });

  });

  res.redirect('/posts/new')
})
