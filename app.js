const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, "views", "partials"))

// ... 

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {


  punkAPI
    .getBeers()              // el primer parametro llama a hbs  y el segundo (los azules) rd un objrto que le va a entrar a view

    .then(beers => res.render("beers", { beers: beers }))
    .catch(error => console.log(error));
});


app.get("/random-beer", (req, res) => {

  punkAPI
    .getRandom()
    .then(randomBeer => res.render("random-beer", { randomBeer }))
    .catch(error => console.log(error));

})



app.get("/beerpartial", (req, res) => {


  punkAPI
    .getBeers()
    .then(beers => res.render("beerpartial", { beers: beers }))
    .catch(error => console.log(error));
});


app.get("/beerpartial/beer-:id", (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beers => res.render("beer", { beers: beers }))
    .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));


