const express = require('express');
const reload = require('reload');
const User = require('./models/user.model');
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
reload(app);

const users = [
    new User('tèo', 12),
    new User('tý', 15),
    new User('tủn', 17)
];

app.get('/', (req,res) => {res.render('home', {name : 'Hùng'});});

app.get('/user', (req,res) => { res.render('user', {users});});
app.get('/add/:name/:age', (req,res) => { 
    const {name,age} = req.params;
    const user = new User(name,age);
    users.push(user);
    res.redirect('/user');
});

app.post('/add',parser,(req,res) => {
    const {name,age} = req.body;
    const user = new User(name,age);
    users.push(user);
    res.redirect('/user');
})

app.listen(3000, () => console.log('Server Started'));
    