module.exports = (app) => {
    const contacts = require('../controllers/note.controller.js');
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, content-type");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        next();
      });

    // Create a new Note
    app.post('/contacts', contacts.create);

    // Retrieve all Notes
    app.get('/contacts', contacts.findAll);

    // Retrieve a single Note with noteId
    app.get('/contacts/:contactId', contacts.findOne);

    // Update a Note with noteId
    app.put('/contacts/:contactId', contacts.update);

    // Delete a Note with noteId
    app.delete('/contacts/:contactId', contacts.delete);
}