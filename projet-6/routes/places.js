var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const Place = require('../modeles/placeSchema')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/', function(req, res) {
    res.render('placee');
})
router.post('/creation', upload.single("picture"), function(req, res){
    var use = req.body;
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
    console.log(use);

    var file = req.file
    const dest = file.destination.split("/");
    const path = "/" + dest[1] + "/" + dest[2] + "/" + file.filename;
    const photo = new Place({
        title : use.title,
        description : use.description,
        photo : path
})
    photo.save()
    .then(()=> {
        res.render('detail', {userID});
    })
    .catch((err)=> {
        throw err
    })

});
module.exports = router;
