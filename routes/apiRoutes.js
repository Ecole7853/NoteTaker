const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
module.exports = (app) => {
    //filling out api routes
    app.get('/api/notes', (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            res.send(data);
        });
    });
    app.post('/api/notes', (req, res) => {
        const id = uuidv4();
        req.body.id = id;
        db.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(db), (err, data) => {
            if (err) throw err;
            res.send('Note saved!');
        })
    })
    app.delete('/api/notes/:id', (req, res) => {
            var index = db.findIndex(note => {
                return note.id===req.params.id 
                }
            )
            db.splice(index, 1);
            fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
                if (err) throw err;
                res.send('Note removed!');
            });
    })
}