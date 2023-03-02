const router=require("express").Router();
const { writeFile } = require('fs');

let store = require('../db/db.json');

// GET api/notes
router.get('/notes', function (req, res) {
    res.json(store);
});

// POST api/notes
router.post('/notes', function ({body}, res) {
    body.id= Math.floor(Math.random()*1000000).toString(16);
    store.push(body);
    writeFile('./db/db.json', JSON.stringify(store), err => {
        if(err) throw err;
        res.json(store);
    })
});

// DELETE api/notes
router.delete('/notes/:id', function ({params}, res) {
    store = store.filter(obj => obj.id != params.id);
    
    writeFile('./db/db.json', JSON.stringify(store), err => {
        if(err) throw err;
        res.json(store);
    })
})

module.exports=router;