var express = require('express');

var router = express.Router();
var bodyParser = require("body-parser");// call body parser module and make use of it

// Support both URL-encoded and JSON data
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json()); // Add JSON support
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(require('./controller/staticpages'))
router.use(require('./controller/formcontroller'))

module.exports = router;