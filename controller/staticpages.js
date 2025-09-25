var express = require('express');

var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
var db = require('../db');
//const Game = require('../components/games');

router.get('/', function(req, res) {
  var title = 'Gabriela Prado - Portfolio';
  const query = "SELECT * FROM projects";
  
  db.query(query, (err, results) => {
    if (err) throw err;

    //console.log('Projects retrieved from database:', results);

    // Convert technologies string into array
    const projects = results.map(project => ({
      ...project,
      technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
      platforms: project.platforms ? project.platforms.split(',').map(p => p.trim()) : [],
    
    }));

    // ✅ Send the parsed projects, not raw results
    res.render('home', { title: title, projects: projects });
  });
});


/* router.get('/contact',  function(req, res){
    var title = 'Contact: Stinky Cat Studio';
    res.render('contact', {title: title})
});


router.get('/games',  function(req, res){
    const game =  new Game();
    var title = 'Games : Stinky Cat Studio';
    game.getAllGames((games) => {
       res.render('games', {games, title});
    });
});
   

router.get('/apigames',  function(req, res){
    const game =  new Game();
    game.getAllGames((games) => {
       res.json(games);
    });
});
   


router.get('/services',  function(req, res){
    var title = 'Services : Stinky Cat Studio'; 
    res.render('services', {title: title})  
});


router.get('/rising',  function(req, res){
    var title = 'Rising';   
    res.render('rising', {title: title})    
});

router.get('/parrotchi',  function(req, res){
    var title = 'Parrotchi';
    res.render('parrotchi', {title: title})
}); */


module.exports = router;