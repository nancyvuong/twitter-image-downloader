const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getTweet = require('./utils/twitter');
const downloadImages = require('./utils/download');

const app = express();
const port = process.env.PORT;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Twitter Image Downloader'
  });
});

app.get('/tweet', async (req, res) => {
  if(!req.query.id){
    return res.send({
        error: "You must provide a Tweet id"
    });
  }

  try{
    const tweet = await getTweet(req.query.id);
    downloadImages(tweet);
    res.send(tweet);
  } catch(e){
      res.send({
        error: "Tweet has no images"
      });
  }
  
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found'
  });
});



app.listen(port, () => {
  console.log('Server is up on port ' + port + '.');
}); 

