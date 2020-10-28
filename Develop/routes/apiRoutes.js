const notesData = require('../db/db.json');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {

    app.get('/api/notes', function(req, res) {
        res.json(notesData);
    });

    app.post('/api/notes', function(req,res)  {
        const notes = req.body;

        if (notesData.length === 0) {
            notes.id = 0
        }
        else {
            notes.id = notesData[notesData.length - 1].id + 1
        }

        fs.readFile(path.join(_dirname, '../db/db.json'), 'utf8', function (error, notesData) {

            const json = JSON.parse(notesData)
            json.push(notes)

            fs.writeFile(path.join(_dirname, '../db/db.json'), JSON.stringify(json), 'utf8', function (error) {
                if (error) {
                    console.log(error)
                }
                console.log('success')
            }
            )
        }
        );
        notesData.push(notes);
        res.json(true);
    });
    
    app.delete('/api/notes/:id', function(req,res)  {
        var deleteID = req.params.id
        let note = notesData.filter(note => {
            return note.id == deleteID; 
        })[0];

        const index = notesData.indexOf(note);
        notesData.splice(index, 1);
        res.json(true);
    });
}