var express = require('express');
var router = express.Router();
const User = require("../modeles/userSchema")
const bcrypt = require('bcrypt')
const Users = require('../modeles/userSchema')


/* GET users listing. */
router.get('/connexion', function(req, res, next){
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
    res.render('connexion',  {userID});
});

router.get('/inscription', function(req, res, next){
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
    res.render('inscription', {userID});
})

router.get('/detail', function(req, res, next) {
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
    res.render('detail',  {userID});
})


router.post('/inscription', function (req, res) {
    var use = req.body;
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
    if (use.username && use.email && use.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(use.password, salt);
        console.log(hash);
        const user = new User ( {
          username : use.username,
          email : use.email,
          password : hash,
          admin : false
        })
        user.save()
        .then(()=> {
            res.render('connexion', {userID});
        })
        .catch((err)=> {
            throw err
        })
    }
})

router.post('/connexion', function (req, res){
    var use = req.body;

    User.findOne({ email: req.body.email })
    .then((user) => {
    if (user.email) {
          var crypt = bcrypt.compareSync(use.password, user.password);
           if (crypt == true) {
              req.session.user_id=user._id;
              res.redirect("/");
          }
          else {
             res.status(400).send('Erreur!');

         }
     }
    });
   });

router.get('/logout', function(req, res){
    req.session.destroy();
    req.session.user_id;
    req.logout();
    res.redirect('/users/connexion');
});

router.get('/profil/:id', function (req, res){
    var userID = req.params.id;
    console.log(userID);
    User.findOne({_id:req.params.id}).then function(user)
    res.render('profil', {userID});
})

module.exports = router;
