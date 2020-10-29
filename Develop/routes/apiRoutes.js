const notesData = require('../db/db.json');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {

    app.get('/api/notes',  (req, res) => {
        res.json(notesData);
    });

    app.post('/api/notes', (req,res)  => {
        notesData.push(req.body);
        res.json(true);
    });

    app.delete('/api/notes/:id', (req,res) => {
        var deleteID = req.params.id
        let note = notesData.filter(note => {
            return note.id == deleteID; 
        })[0];

        const index = notesData.indexOf(note);
        notesData.splice(index, 1);
        res.json(true);
    });
}