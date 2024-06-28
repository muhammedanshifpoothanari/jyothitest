const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient} = require('mongodb');


let user = []
let db = '';


async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
 





app.use(cors())

app.use(express.json())

app.get('/users', async function (req, res) {
    let output = await db.collection('user').find({}).toArray();
    res.json(output)
})

app.post('/register', async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
})



app.post('/login', async function (req, res) {
    console.log(req.body);
    let output = await db.collection('user').find({"email": req.body.email}).toArray();
     console.log(output);
     if(output.length == 0) {
        return  res.json('email not found')
     } else {
        if(output[0].password == req.body.password) {
            return res.json(output[0])
        }
        return res.json('email not found')
     }


});



app.listen(5002, function() {
    console.log('server is ready,listening on port 5002');
    mongoConnect();
})