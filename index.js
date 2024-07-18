const express = require('express');
const app = express();

const notes = [
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
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello, World!</h1>');
});

app.get('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(notes)
  })

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    
    if (!note) {
        console.log(`Note ${note.id} not found`)
      response.status(404).send('Note not found')
    } else {
      response.json(note)
    }
    response.json(note)
})

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    
  })

  app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id))) 
      : 0
  
    const note = request.body
    note.id = String(maxId + 1)
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
