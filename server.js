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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
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
