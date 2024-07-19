const express = require('express');
const app = express();

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Log each request to the console
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Get all notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
});

// Get a single note by id
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (!note) {
        response.status(404).send('Note not found');
    } else {
        response.json(note);
    }
});

// Create a new note
app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }

    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0;

    const note = {
        id: maxId + 1,
        content: body.content,
        important: body.important || false,
    };

    notes.push(note);

    response.status(201).json(note);
});

// Delete a note by id
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

// Home route
app.get('/', (request, response) => {
    response.send('<h1>Hello, World!</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
