const express = require('express');
const passport = require('passport');
var session = require('express-session');
const app = express();

require('./auth');

app.use(express.json());


app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  

app.get('/', (req, res) => {
    res.send(`<a href="/auth/google"> Authenticate with google </a>`)
})

app.get('/protected', isLoggedIn, (req, res) => {
    
    res.send(`Hello ${req.user.displayName}`)
})

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) {
            console.log(err)
            return next(err);
        }
        req.session.destroy()
      res.redirect('/auth/google');
    });
  });



app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
    ));

app.get('/auth/failure', (req, res) => {
    res.send('Authentication failed')
}
);

app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
);

app.listen(4000, ()=>console.log('listening on 4000'))