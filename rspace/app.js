const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require("mongodb");
require('./config');
const courses = require('./courses');
const users = require('./users');

app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/action', async (req, res)=>{
    
    const url = "mongodb+srv://CheeseSpread:Abc12e@cluster.dvq2y.mongodb.net/RSpace?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("RSpace");
    const col = db.collection("courses");


    let courseName = req.body.courseName;
    let course = new courses({courseName});
    const result = await col.insertOne(course);
    console.log(result);
    res.render('courses');

});


app.post('/actionuser', async (req, res)=>{
    
  const url = "mongodb+srv://CheeseSpread:Abc12e@cluster.dvq2y.mongodb.net/RSpace?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db("RSpace");
  const col = db.collection("users");


  let uname = req.body.uname;
  let email = req.body.email;
  let password = req.body.password;
  var newuser = new users({
    userName : uname,
    email : email,
    password : password
  });
  newuser.save();
  res.render('signin');

});


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res)=>{
    res.render('courses');
});

app.get('/courses.ejs', (req, res)=>{
    res.render('courses');
});

app.get('/course1.ejs', (req, res)=>{
    res.render('course1');
});

app.get('/addcourse.ejs', (req, res)=>{
    res.render('addcourse');
});

app.get('/signin.ejs', (req, res)=>{
    res.render('signin');
});
app.get('/addpdf.ejs', (req, res)=>{
    res.render('addpdf');
});
app.get('/signup.ejs', (req, res)=>{
    res.render('signup');
});



app.listen(3000,  ()=> console.log('Server online'));

