const express = require('express');
const app = express();
const cors = require('cors');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('pemaindb.json')
const pemaindb = low(adapter)
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
pemaindb.defaults({ data: [] }).write()

app.get('/',(req,res)=>{
    var y = pemaindb.get('data').value();
    res.send(y);
})

app.post('/', (req,res)=>{
    pemaindb.get('data').push({ nama:req.body.nama, usia:req.body.usia}).write()
    console.log(req.body);
    res.send({
        type: 'POST BERHASIL',
        nama: req.body.nama,
        usia: req.body.usia
    });
})

app.listen(3003, ()=>{
    console.log('Server @port Localhost:3003')
})