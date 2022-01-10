//importo i pack npm che mi servono con la sintassi pre-es6
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
//controller
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: "postgres://bpyqbkajbdlnac:7a17c853f2de28a9d7ef2b82c15e97a54cdad28e9f438058eec905f96d1e807a@ec2-3-225-41-234.compute-1.amazonaws.com:5432/d2b15s257nrjir",
        ssl: true,
    }
})

const app = express();
//Uso middleware per poter utilizzare i pack npm che mi servono
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send("Ma che lavoro e");
  })
//1 Signin route
app.post('/signin', (req,res) => { signin.handleSignIn(req,res,db,bcrypt) });
//register
app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) });
//profile
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db) } );
//image
app.put('/image', (req,res) =>{ image.handleImage(req,res,db) });
app.post('/imageurl', (req,res) =>{ image.handleApiCall(req,res,db) });
//metto il server sulla porta 3001 sulla 3000 c'è il fe
app.listen(process.env.PORT||3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
